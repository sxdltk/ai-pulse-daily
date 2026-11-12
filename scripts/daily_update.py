#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
AI 全景观察 · 每日新闻采集脚本
--------------------------------
纯 Python 标准库实现，无需安装任何第三方依赖。

做的事：
  1. 并发抓取 scripts/sources.json 中配置的中英文 RSS / Atom 新闻源
  2. 用关键词过滤出 AI 相关条目，清洗 HTML、统一到北京时间
  3. 按关键词自动归入 7 个分类，去重（链接 + 规范化标题）
  4. 与 data/news.js 中的历史数据合并，生成当日要点，保留最近 N 天
  5. 重写 data/news.js（给静态页面用）与 data/news.json（给其他程序用）

用法：
  python3 scripts/daily_update.py                 # 采集并写入
  python3 scripts/daily_update.py --dry-run      # 只预览，不改文件
  python3 scripts/daily_update.py --days 30      # 覆盖保留天数
"""
from __future__ import annotations

import argparse
import hashlib
import html
import json
import os
import re
import sys
import time
import urllib.request
import urllib.error
from urllib.parse import urlparse
import xml.etree.ElementTree as ET
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timedelta, timezone
from email.utils import parsedate_to_datetime
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONFIG_PATH = ROOT / "scripts" / "sources.json"
NEWS_JS = ROOT / "data" / "news.js"
NEWS_JSON = ROOT / "data" / "news.json"
TZ8 = timezone(timedelta(hours=8), "Asia/Shanghai")

TAG_RE = re.compile(r"<[^>]+>")
SPACE_RE = re.compile(r"\s+")
PUNCT_RE = re.compile(r"[\W_]+", re.UNICODE)
CATEGORIES = ["模型发布", "产品更新", "融资并购", "政策监管", "算力硬件", "研究突破", "行业动态"]


def log(msg: str) -> None:
    print(f"[{datetime.now(TZ8):%H:%M:%S}] {msg}", flush=True)


def load_config() -> dict:
    with CONFIG_PATH.open("r", encoding="utf-8") as f:
        return json.load(f)


def load_existing() -> dict:
    """从 data/news.js 中读出已有的 JSON 数据（文件是 JS 包装的 JSON）。"""
    if not NEWS_JS.exists():
        return {"updatedAt": "-", "timezone": "Asia/Shanghai", "sourceCount": 0, "days": []}
    text = NEWS_JS.read_text(encoding="utf-8")
    try:
        start, end = text.index("{"), text.rindex("}")
        data = json.loads(text[start:end + 1])
        data.setdefault("days", [])
        return data
    except (ValueError, json.JSONDecodeError) as e:
        log(f"警告：无法解析已有 news.js（{e}），将以空数据启动")
        return {"updatedAt": "-", "timezone": "Asia/Shanghai", "sourceCount": 0, "days": []}


def local_name(tag: str) -> str:
    return tag.rsplit("}", 1)[-1].lower()


def clean_text(raw: str | None) -> str:
    if not raw:
        return ""
    s = html.unescape(raw)
    s = TAG_RE.sub(" ", s)
    s = s.replace("\u00a0", " ").replace("\u200b", "")
    return SPACE_RE.sub(" ", s).strip()


def parse_date(raw: str | None) -> datetime | None:
    if not raw:
        return None
    raw = raw.strip()
    # RFC 822 / RFC 2822（RSS pubDate）
    try:
        dt = parsedate_to_datetime(raw)
        if dt:
            return dt if dt.tzinfo else dt.replace(tzinfo=TZ8)
    except (TypeError, ValueError, OverflowError):
        pass
    # ISO 8601（Atom published / updated）
    try:
        s = raw.replace("Z", "+00:00")
        s = re.sub(r"(\.\d{6})\d+", r"\1", s)  # 截断过长的小数秒
        dt = datetime.fromisoformat(s)
        return dt if dt.tzinfo else dt.replace(tzinfo=TZ8)
    except (ValueError, TypeError):
        pass
    # 常见中文格式兜底
    for fmt in ("%Y-%m-%d %H:%M:%S", "%Y-%m-%d", "%Y/%m/%d %H:%M:%S", "%Y/%m/%d"):
        try:
            return datetime.strptime(raw[:19], fmt).replace(tzinfo=TZ8)
        except ValueError:
            continue
    return None


def find_child(el, *names: str):
    for child in el:
        if local_name(child.tag) in names:
            return child
    return None


def parse_feed(xml_bytes: bytes, feed: dict, max_items: int) -> list[dict]:
    try:
        root = ET.fromstring(xml_bytes)
    except ET.ParseError as e:
        raise ValueError(f"XML 解析失败: {e}")

    entries = []
    # RSS 2.0 / RDF：channel > item（也可能是全局 item）
    for item in root.iter():
        if local_name(item.tag) != "item":
            continue
        title = clean_text(find_child(item, "title").text if find_child(item, "title") is not None else "")
        link_el = find_child(item, "link")
        link = clean_text(link_el.text if link_el is not None else "")
        desc_el = find_child(item, "description", "summary", "encoded")
        summary = clean_text("".join(desc_el.itertext()) if desc_el is not None else "")
        date_el = find_child(item, "pubdate", "date", "published", "updated", "dc:date")
        date_raw = clean_text(date_el.text if date_el is not None else "")
        if not date_raw and date_el is not None:
            date_raw = clean_text("".join(date_el.itertext()))
        entries.append((title, link, summary, date_raw))

    # Atom：feed > entry
    if not entries:
        for item in root.iter():
            if local_name(item.tag) != "entry":
                continue
            t_el = find_child(item, "title")
            title = clean_text("".join(t_el.itertext()) if t_el is not None else "")
            link = ""
            for lk in item:
                if local_name(lk.tag) == "link":
                    href = lk.attrib.get("href", "")
                    rel = lk.attrib.get("rel", "alternate")
                    if href and (rel == "alternate" or not link):
                        link = href
            d_el = find_child(item, "summary", "content", "description")
            summary = clean_text("".join(d_el.itertext()) if d_el is not None else "")
            p_el = find_child(item, "published", "updated", "modified")
            date_raw = clean_text(p_el.text if p_el is not None else "")
            entries.append((title, link, summary, date_raw))

    out = []
    for title, link, summary, date_raw in entries[: max_items * 2]:
        if not title or len(title) < 6:
            continue
        out.append({
            "title": title,
            "url": link,
            "summary": summary,
            "dateRaw": date_raw,
            "source": feed["name"],
            "lang": feed.get("lang", "zh"),
        })
        if len(out) >= max_items:
            break
    return out


def fetch_one(feed: dict, settings: dict) -> tuple[str, list[dict], str]:
    url = feed["url"]
    req = urllib.request.Request(url, headers={
        "User-Agent": settings.get("userAgent", "Mozilla/5.0"),
        "Accept": "application/rss+xml, application/atom+xml, application/xml, text/xml, */*",
        "Accept-Encoding": "identity",
        "Connection": "close",
    })
    attempts = 1 + max(0, int(settings.get("retries", 1)))
    last_err = ""
    for attempt in range(attempts):
        try:
            with urllib.request.urlopen(req, timeout=settings.get("timeout", 18)) as resp:
                raw = resp.read(2_000_000)
            items = parse_feed(raw, feed, settings.get("maxPerFeed", 40))
            if not items and raw.lstrip()[:1] == b"<" and b"<html" in raw[:600].lower():
                raise ValueError("返回的是 HTML 页面而非 RSS（源可能已失效）")
            return feed["name"], items, ""
        except Exception as e:  # 单源失败不影响整体
            last_err = f"{type(e).__name__}: {e}"
            if attempt < attempts - 1:
                time.sleep(1.5 * (attempt + 1))
    return feed["name"], [], last_err


def norm_key(title: str) -> str:
    return PUNCT_RE.sub("", title.lower()).strip()


def title_hash(nk: str) -> str:
    return hashlib.md5(nk.encode("utf-8")).hexdigest()[:16]


def kw_match(kw: str, text: str) -> bool:
    """中文用子串匹配；英文用左词边界 + 前缀匹配，避免 fine 命中 Finance、AI 命中 said。"""
    k = kw.lower()
    if k.isascii():
        return re.search(r"(?<!\w)" + re.escape(k), text) is not None
    return k in text


def all_keywords(keywords: dict) -> list[str]:
    seen, out = set(), []
    for group in ("zh", "en"):
        for kw in keywords.get(group, []):
            k = kw.lower()
            if k not in seen:
                seen.add(k)
                out.append(k)
    return out


def ai_relevance(title: str, summary: str, kws: list[str]) -> float:
    """标题命中 AI 关键词才被认为强相关；仅摘要多次提及也可通过（阈值更严）。"""
    t, s = title.lower(), summary.lower()
    t_hits = sum(1 for k in kws if kw_match(k, t))
    s_hits = sum(1 for k in kws if kw_match(k, s))
    if t_hits >= 1:
        return 3.0 + min(t_hits, 3) * 0.5 + min(s_hits, 5) * 0.2
    if s_hits >= 3:
        return 1.0 + min(s_hits, 8) * 0.25
    return 0.0


def classify(title: str, summary: str, rules: dict) -> str:
    t, s = title.lower(), summary.lower()
    scores = {c: 0.0 for c in CATEGORIES}
    for cat, cfg in rules.items():
        if cat.startswith("_") or cat not in scores:
            continue
        for kw in cfg.get("strong", []):
            if kw_match(kw, t):
                scores[cat] += 4.0
            elif kw_match(kw, s):
                scores[cat] += 1.0
        for kw in cfg.get("weak", []):
            if kw_match(kw, t):
                scores[cat] += 0.9
            elif kw_match(kw, s):
                scores[cat] += 0.2
    best = max(scores, key=lambda c: scores[c])
    return best if scores[best] >= 1.0 else "行业动态"


def make_item(raw: dict, dt: datetime, rules: dict, summary_len: int) -> dict:
    summary = raw["summary"]
    if len(summary) > summary_len:
        cut = summary[:summary_len]
        p = max(cut.rfind("。"), cut.rfind("."), cut.rfind("，"))
        summary = (cut[:p + 1] if p > summary_len * 0.6 else cut) + "…"
    return {
        "title": raw["title"][:160],
        "summary": summary,
        "category": classify(raw["title"], raw["summary"], rules),
        "source": raw["source"],
        "url": raw["url"],
        "time": f"{dt:%H:%M}",
        "origin": "auto",
    }


def build_highlights(items: list[dict], n: int) -> list[str]:
    """从不同分类中挑选代表性标题，作为当日要点。"""
    picked, seen_cats = [], set()
    ordered = sorted(items, key=lambda x: (len(x.get("summary", "")), len(x.get("title", ""))), reverse=True)
    for it in ordered:
        if it.get("category") in seen_cats:
            continue
        picked.append(it["title"])
        seen_cats.add(it.get("category"))
        if len(picked) >= n:
            break
    for it in ordered:
        if len(picked) >= n:
            break
        if it["title"] not in picked:
            picked.append(it["title"])
    return picked[:n]


def main() -> int:
    ap = argparse.ArgumentParser(description="AI 全景观察 · 每日新闻采集")
    ap.add_argument("--dry-run", action="store_true", help="只预览，不写入文件")
    ap.add_argument("--days", type=int, default=None, help="覆盖保留天数")
    args = ap.parse_args()

    t0 = time.time()
    cfg = load_config()
    settings = cfg.get("settings", {})
    keep_days = args.days or settings.get("keepDays", 60)
    feeds = [f for f in cfg.get("feeds", []) if f.get("enabled", True)]
    log(f"开始采集：{len(feeds)} 个新闻源，保留 {keep_days} 天，北京时间")

    # 1) 并发抓取
    all_raw, ok_sources, failed = [], 0, []
    with ThreadPoolExecutor(max_workers=settings.get("workers", 6)) as pool:
        futures = {pool.submit(fetch_one, f, settings): f["name"] for f in feeds}
        for fu in as_completed(futures):
            name, items, err = fu.result()
            if err:
                failed.append(f"{name} -> {err}")
                log(f"  ✗ {name}: {err[:110]}")
            else:
                ok_sources += 1
                all_raw.extend(items)
                log(f"  ✓ {name}: {len(items)} 条")
    log(f"抓取完成：成功 {ok_sources}/{len(feeds)} 个源，原始 {len(all_raw)} 条")

    if ok_sources == 0:
        log("警告：所有新闻源均不可用，保留原有数据不变（本次不写入）")
        return 0
    if failed:
        log(f"提示：{len(failed)} 个源本次失败，已跳过，不影响其余数据")

    existing = load_existing()
    days_map: dict[str, dict] = {d["date"]: d for d in existing.get("days", [])}
    known_titles = {norm_key(i.get("title", "")) for d in days_map.values() for i in d.get("items", []) if i.get("title")}
    known_urls = {i.get("url", "") for d in days_map.values() for i in d.get("items", []) if i.get("url")}
    # 已见记录：即使某条因单日上限被截掉，也不会在下次运行时被误判为「新增」
    seen_list = list(existing.get("seenHashes", []))
    seen_set = set(seen_list)
    for _t in known_titles:
        _h = title_hash(_t)
        if _h not in seen_set:
            seen_set.add(_h)
            seen_list.append(_h)

    now = datetime.now(TZ8)
    today = now.date()
    floor = today - timedelta(days=keep_days - 1)
    keywords = cfg.get("keywords", {})
    kws = all_keywords(keywords)
    rules = cfg.get("categories", {})
    summary_len = settings.get("summaryLength", 190)
    max_per_day = settings.get("maxItemsPerDay", 80)
    max_auto = settings.get("maxAutoPerDay", 18)

    new_by_day: dict[str, list[dict]] = {}
    skipped = {"old": 0, "non_ai": 0, "dup": 0}
    for raw in all_raw:
        dt = parse_date(raw.get("dateRaw")) or now
        dt = dt.astimezone(TZ8)
        d = dt.date()
        if d > today:
            d = today
        if d < floor:
            skipped["old"] += 1
            continue
        rel = ai_relevance(raw["title"], raw["summary"], kws)
        if rel < 3.0:
            skipped["non_ai"] += 1
            continue
        nk = norm_key(raw["title"])
        h = title_hash(nk)
        if h in seen_set or nk in known_titles or (raw["url"] and raw["url"] in known_urls):
            skipped["dup"] += 1
            continue
        seen_set.add(h)
        seen_list.append(h)
        known_titles.add(nk)
        if raw["url"]:
            known_urls.add(raw["url"])
        item = make_item(raw, dt, rules, summary_len)
        item["_rel"] = rel
        new_by_day.setdefault(d.isoformat(), []).append(item)

    # 每天只保留相关度最高的若干条自动采集结果，避免淹没人工校订的精选稿
    for date_str in list(new_by_day):
        arr = sorted(new_by_day[date_str], key=lambda x: x["_rel"], reverse=True)[:max_auto]
        for it in arr:
            it.pop("_rel", None)
        new_by_day[date_str] = arr

    total_new = sum(len(v) for v in new_by_day.values())
    log(f"清洗结果：新增 {total_new} 条；跳过 过期 {skipped['old']} / 非AI {skipped['non_ai']} / 重复 {skipped['dup']}")

    # 2) 合并到历史
    for date_str, items in new_by_day.items():
        day = days_map.get(date_str, {"date": date_str, "highlights": [], "items": []})
        day.setdefault("items", [])
        day["items"] = (day["items"] + items)[:max_per_day]
        # 人工校订的精选稿排在前，自动采集的补充流排在后面；组内按时间升序
        day["items"].sort(key=lambda x: (0 if x.get("origin") == "seed" else 1, x.get("time", "00:00")))
        days_map[date_str] = day

    # 3) 生成 / 补充当日要点
    hl_n = settings.get("highlightsPerDay", 3)
    for date_str in new_by_day:
        day = days_map[date_str]
        hl = day.get("highlights", [])
        if len(hl) < hl_n:
            auto_items = [i for i in day["items"] if i.get("origin") == "auto"]
            extra = build_highlights(auto_items, hl_n - len(hl))
            day["highlights"] = (hl + [h for h in extra if h not in hl])[:hl_n]

    # 4) 裁剪过期日期，按日期倒序
    kept_days = sorted([d for d in days_map.values() if d["date"] >= floor.isoformat()],
                       key=lambda x: x["date"], reverse=True)
    for d in kept_days:
        d.setdefault("highlights", [])

    result = {
        "updatedAt": f"{now:%Y-%m-%d %H:%M:%S}",
        "timezone": "Asia/Shanghai",
        "sourceCount": len(feeds),
        "sources": [{"name": f["name"], "host": urlparse(f["url"]).netloc.replace("www.", "")} for f in feeds],
        "seenHashes": seen_list[-12000:],
        "lastRun": {
            "okSources": ok_sources,
            "totalSources": len(feeds),
            "failedSources": failed,
            "newItems": total_new,
            "skipped": skipped,
            "durationSec": round(time.time() - t0, 1),
        },
        "days": kept_days,
    }
    total_items = sum(len(d.get("items", [])) for d in kept_days)
    log(f"归档完成：{len(kept_days)} 天 / {total_items} 条，耗时 {result['lastRun']['durationSec']}s")

    if args.dry_run:
        for d in kept_days[:3]:
            log(f"  预览 {d['date']}：{len(d.get('items', []))} 条")
            for i in d.get("items", [])[:3]:
                log(f"    · [{i['category']}] {i['title'][:60]}")
        log("--dry-run 模式，未写入文件")
        return 0

    # 5) 原子写入两个数据文件
    payload = json.dumps(result, ensure_ascii=False, indent=2)
    js_text = ("/* 本文件由 scripts/daily_update.py 自动生成，请勿手工编辑。\n"
               " * 手工整理的基础数据在 data/base.js；修改源配置请编辑 scripts/sources.json。 */\n"
               "window.AI_NEWS_DATA = " + payload + ";\n")
    for path, content in ((NEWS_JS, js_text), (NEWS_JSON, payload + "\n")):
        tmp = path.with_suffix(path.suffix + ".tmp")
        tmp.write_text(content, encoding="utf-8")
        os.replace(tmp, path)
    log(f"已写入 {NEWS_JS.relative_to(ROOT)} 与 {NEWS_JSON.relative_to(ROOT)}")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except KeyboardInterrupt:
        log("已中断")
        sys.exit(130)
    except Exception as e:
        log(f"运行失败：{type(e).__name__}: {e}")
        raise
