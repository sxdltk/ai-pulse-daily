/* ============ AI 全景观察 · 前端渲染 ============ */
(function () {
  'use strict';
  const BASE = window.AI_BASE_DATA || {};
  const NEWS = window.AI_NEWS_DATA || { updatedAt: '-', days: [] };
  const $ = (s, root) => (root || document).querySelector(s);
  const $$ = (s, root) => Array.from((root || document).querySelectorAll(s));

  function esc(v) {
    return String(v == null ? '' : v)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function safeUrl(u) {
    try { const p = new URL(u); return (p.protocol === 'https:' || p.protocol === 'http:') ? esc(u) : '#'; }
    catch (e) { return '#'; }
  }
  function tags(list, cls) {
    return (list || []).map((t, i) => `<span class="tag ${cls || ['', 'cyan', 'green', 'amber', 'pink'][i % 5]}">${esc(t)}</span>`).join('');
  }
  function weekday(dateStr) {
    const w = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const d = new Date(dateStr + 'T00:00:00');
    return isNaN(d) ? '' : w[d.getDay()];
  }
  function allNews() {
    const out = [];
    (NEWS.days || []).forEach((d) => (d.items || []).forEach((it) => out.push(Object.assign({}, it, { date: d.date }))));
    return out;
  }

  /* ---------- 顶部状态 & 统计 ---------- */
  const newsAll = allNews();
  const today = (NEWS.days && NEWS.days[0]) ? NEWS.days[0] : null;
  $('#updated-at').textContent = NEWS.updatedAt || '-';
  $('#today-count').textContent = today ? today.items.length : 0;

  const statDefs = [
    { num: (BASE.models || []).length, label: '主流大模型', sub: '前沿 / 开源 / 主权' },
    { num: (BASE.products || []).length, label: 'AI 产品助手', sub: '全球 + 中国头部' },
    { num: (BASE.agents || []).length, label: '智能体产品', sub: '通用 / 编码 / 企业' },
    { num: (BASE.coders || []).length, label: 'AI 编程器', sub: '含 ' + (BASE.agentFrameworks || []).length + ' 个开发框架' },
    { num: newsAll.length, label: '累计情报', sub: (NEWS.days || []).length + ' 天归档' },
    { num: (NEWS.sourceCount || 0), label: '采集新闻源', sub: '每日自动抓取' }
  ];
  $('#stats').innerHTML = statDefs.map((s) => `
    <div class="stat"><div class="num">${s.num}</div><div class="label">${esc(s.label)}</div><div class="sub">${esc(s.sub)}</div></div>
  `).join('');

  /* ---------- 总览 ---------- */
  function renderOverview() {
    const topShare = (BASE.coderShare || []).slice(0, 5).map((x) => `
      <div style="display:flex;justify-content:space-between;gap:10px;padding:9px 0;border-bottom:1px solid var(--line)">
        <span style="font-size:12.8px">${esc(x.name)}</span>
        <span style="font-variant-numeric:tabular-nums;font-weight:650;color:var(--cyan)">${x.share}%</span>
      </div>`).join('');

    $('#overview-stats').innerHTML = `
      <div class="panel">
        <h3>今日速览 · ${esc(today ? today.date : '-')}</h3>
        <div class="ph-sub">来自每日自动采集与人工校订的行业要闻</div>
        <div class="highlight-box" style="margin-bottom:4px">
          <h4>KEY HIGHLIGHTS</h4>
          <ul>${(today && today.highlights ? today.highlights : []).map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
        </div>
      </div>
      <div class="panel">
        <h3>编程器份额 TOP 5</h3>
        <div class="ph-sub">2026 年 10 月 · 开发者主力工具口径</div>
        ${topShare}
        <div style="margin-top:14px"><a href="https://firstpagesage.com/seo-blog/ai-coding-assistant-market-share" target="_blank" rel="noopener">查看完整调研 ↗</a></div>
      </div>`;

    $('#overview-latest').innerHTML = (today ? today.items.slice(0, 6) : []).map((n) => `
      <div class="news-item" style="grid-template-columns:1fr">
        <div>
          <div class="news-title"><a href="${safeUrl(n.url)}" target="_blank" rel="noopener">${esc(n.title)}</a></div>
          <div class="news-meta"><span class="cat ${esc(n.category)}">${esc(n.category)}</span><span>${esc(n.source)}</span><span>${esc(n.time || '')}</span></div>
        </div>
      </div>`).join('');

    $('#overview-insights').innerHTML = (BASE.insights || []).slice(0, 3).map((i) => `
      <div class="insight" style="margin-bottom:10px">
        <div class="no">${esc(i.no)}</div>
        <div><h3>${esc(i.title)}</h3><p>${esc(i.body.slice(0, 150))}…</p>
        <div class="foot"><span class="tag amber">${esc(i.tag)}</span><a href="${safeUrl(i.source)}" target="_blank" rel="noopener">来源 ↗</a></div></div>
      </div>`).join('');
  }

  /* ---------- 模型 ---------- */
  function renderModels(filter) {
    const list = (BASE.models || []).filter((m) => !filter || filter === '全部' ||
      (filter === '闭源旗舰' && !m.open) || (filter === '开源 / 开放权重' && m.open) ||
      (filter === '中国厂商' && (m.region === '中国')) || (filter === '海外厂商' && m.region !== '中国'));
    $('#models-count').textContent = '共 ' + list.length + ' 款模型';
    $('#models-grid').innerHTML = list.map((m) => `
      <div class="card" data-search="${esc((m.name + m.vendor + m.highlight + m.best + (m.tags || []).join('')).toLowerCase())}">
        <div class="card-head">
          <div><div class="card-title">${esc(m.name)}</div><div class="card-vendor">${esc(m.vendor)} · ${esc(m.region)}</div></div>
          <span class="tag ${m.open ? 'green' : 'pink'}">${m.open ? '开源' : '闭源'}</span>
        </div>
        <div class="tag-row">${tags([m.tier, ...(m.tags || [])], '')}</div>
        <div class="card-line"><b>定位</b><span>${esc(m.tier)} · ${esc(m.best)}</span></div>
        <div class="card-line"><b>上下文</b><span class="mono">${esc(m.context)}</span></div>
        <div class="card-line"><b>API 价</b><span class="mono">${esc(m.price)} <span style="color:var(--text-faint);font-size:11px">/ 百万 tokens 入·出</span></span></div>
        <div class="card-line"><b>能力</b><span>${m.score ? `<span class="score"><span class="score-bar"><i style="width:${Math.min(100, m.score / 60 * 100)}%"></i></span><b style="min-width:auto;color:var(--cyan)">${m.score}</b></span> <span style="color:var(--text-faint);font-size:11px">${esc(m.scoreLabel)}</span>` : `<span style="color:var(--text-faint)">${esc(m.scoreLabel)}</span>`}</span></div>
        <div class="card-body">${esc(m.highlight)}</div>
        <div class="card-note">${esc(m.note)}</div>
        <div class="card-src"><a href="${safeUrl(m.source)}" target="_blank" rel="noopener">数据来源 ↗</a></div>
      </div>`).join('') || '<div class="empty">没有匹配的模型</div>';
  }

  /* ---------- 产品 ---------- */
  function renderProducts(filter) {
    const list = (BASE.products || []).filter((p) => !filter || filter === '全部' ||
      (filter === '全球' && p.region === '全球') || (filter === '中国' && p.region !== '全球'));
    $('#products-count').textContent = '共 ' + list.length + ' 款产品';
    $('#products-grid').innerHTML = list.map((p) => `
      <div class="card" data-search="${esc((p.name + p.vendor + p.strength + p.category + (p.tags || []).join('')).toLowerCase())}">
        <div class="card-head">
          <div><div class="card-title">${esc(p.name)}</div><div class="card-vendor">${esc(p.vendor)} · ${esc(p.region)}</div></div>
          <span class="tag cyan">${esc(p.category)}</span>
        </div>
        <div style="margin-top:14px;font-size:23px;font-weight:730;letter-spacing:-.4px;color:var(--text)">${esc(p.scale)}</div>
        <div style="font-size:11px;color:var(--text-faint)">用户规模 / 触达口径</div>
        <div class="card-body">${esc(p.strength)}</div>
        <div class="card-line"><b>商业化</b><span>${esc(p.business)}</span></div>
        <div class="tag-row">${tags(p.tags, '')}</div>
        <div class="card-note">${esc(p.note)}</div>
        <div class="card-src"><a href="${safeUrl(p.source)}" target="_blank" rel="noopener">数据来源 ↗</a></div>
      </div>`).join('') || '<div class="empty">没有匹配的产品</div>';
  }

  /* ---------- 智能体 ---------- */
  function renderAgents(filter) {
    const list = (BASE.agents || []).filter((a) => !filter || filter === '全部' || a.type === filter);
    $('#agents-count').textContent = '共 ' + list.length + ' 个智能体';
    $('#agents-grid').innerHTML = list.map((a) => `
      <div class="card" data-search="${esc((a.name + a.vendor + a.type + a.desc + a.best + (a.tags || []).join('')).toLowerCase())}">
        <div class="card-head">
          <div><div class="card-title">${esc(a.name)}</div><div class="card-vendor">${esc(a.vendor)}</div></div>
          <span class="tag">${esc(a.type)}</span>
        </div>
        <div class="card-line"><b>自主度</b><span>${esc(a.autonomy)}</span></div>
        <div class="card-line"><b>价格</b><span>${esc(a.price)}</span></div>
        <div class="card-line"><b>适合</b><span>${esc(a.best)}</span></div>
        <div class="card-body">${esc(a.desc)}</div>
        <div class="tag-row">${tags(a.tags, 'cyan')}</div>
        <div class="card-src"><a href="${safeUrl(a.source)}" target="_blank" rel="noopener">数据来源 ↗</a></div>
      </div>`).join('') || '<div class="empty">没有匹配的智能体</div>';

    $('#frameworks-grid').innerHTML = (BASE.agentFrameworks || []).map((f) => `
      <div class="card" style="padding:16px 18px" data-search="${esc((f.name + f.vendor + f.desc + f.tag).toLowerCase())}">
        <div class="card-head"><div><div class="card-title" style="font-size:14.5px">${esc(f.name)}</div><div class="card-vendor">${esc(f.vendor)}</div></div><span class="tag green">${esc(f.tag)}</span></div>
        <div class="card-body" style="margin-top:9px">${esc(f.desc)}</div>
      </div>`).join('');
  }

  /* ---------- 编程器 ---------- */
  function renderCoders() {
    const max = Math.max.apply(null, (BASE.coderShare || []).map((x) => x.share));
    $('#share-bars').innerHTML = (BASE.coderShare || []).map((x) => `
      <div class="bar-row">
        <div class="bar-name">${esc(x.name)}<small>${esc(x.vendor)} · ${esc(x.iface)}</small></div>
        <div class="bar-track"><div class="bar-fill" data-w="${(x.share / max * 100).toFixed(1)}" style="width:0%"></div></div>
        <div class="bar-val">${x.share}%<small class="${x.change >= 0 ? 'up-txt' : 'down-txt'}">${x.change >= 0 ? '+' : ''}${x.change}</small></div>
      </div>`).join('');

    $('#coder-cards').innerHTML = (BASE.coders || []).map((c) => `
      <div class="card" data-search="${esc((c.name + c.vendor + c.type + c.pros + c.note + c.tag).toLowerCase())}">
        <div class="card-head"><div><div class="card-title">${esc(c.name)}</div><div class="card-vendor">${esc(c.vendor)} · ${esc(c.type)}</div></div><span class="tag amber">${esc(c.tag)}</span></div>
        <div class="card-line"><b>定价</b><span>${esc(c.price)}</span></div>
        <div class="card-line"><b>优势</b><span>${esc(c.pros)}</span></div>
        <div class="card-line"><b>短板</b><span>${esc(c.cons)}</span></div>
        <div class="card-note">${esc(c.note)}</div>
      </div>`).join('');

    renderTrendChart();
    setTimeout(() => $$('.bar-fill').forEach((b) => { b.style.width = b.dataset.w + '%'; }), 120);
  }

  function renderTrendChart() {
    const t = BASE.coderTrend;
    if (!t) return;
    const W = 520, H = 260, L = 44, R = 14, T = 16, B = 32;
    const maxV = 40, n = t.quarters.length;
    const x = (i) => L + i * (W - L - R) / (n - 1);
    const y = (v) => T + (1 - v / maxV) * (H - T - B);
    let svg = `<svg class="chart-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="AI 编程工具季度份额趋势">`;
    for (let v = 0; v <= maxV; v += 10) {
      svg += `<line class="grid-line" x1="${L}" y1="${y(v)}" x2="${W - R}" y2="${y(v)}"/>`;
      svg += `<text x="${L - 10}" y="${y(v) + 4}" text-anchor="end">${v}%</text>`;
    }
    t.quarters.forEach((q, i) => { svg += `<text x="${x(i)}" y="${H - 10}" text-anchor="middle">${esc(q)}</text>`; });
    svg += `<line class="axis-line" x1="${L}" y1="${H - B}" x2="${W - R}" y2="${H - B}"/>`;
    t.series.forEach((s) => {
      const pts = s.values.map((v, i) => `${x(i)},${y(v)}`).join(' ');
      svg += `<polyline class="series-line" stroke="${s.color}" points="${pts}"/>`;
      s.values.forEach((v, i) => {
        svg += `<circle class="series-dot" cx="${x(i)}" cy="${y(v)}" r="4" fill="${s.color}"><title>${esc(s.name)} ${esc(t.quarters[i])}: ${v}%</title></circle>`;
      });
    });
    svg += '</svg>';
    $('#trend-chart').innerHTML = svg;
    $('#trend-legend').innerHTML = t.series.map((s) => `<span><i style="background:${s.color}"></i>${esc(s.name)}</span>`).join('');
  }

  /* ---------- 新闻 ---------- */
  const CATEGORIES = ['模型发布', '产品更新', '融资并购', '政策监管', '算力硬件', '研究突破', '行业动态'];
  function renderNews(filter) {
    const days = (NEWS.days || []).map((d) => ({
      date: d.date, highlights: d.highlights || [],
      items: (d.items || []).filter((n) => !filter || filter === '全部' || n.category === filter)
    })).filter((d) => d.items.length > 0);
    const total = days.reduce((s, d) => s + d.items.length, 0);
    $('#news-count').textContent = '共 ' + total + ' 条 · ' + days.length + ' 天';

    $('#news-list').innerHTML = days.map((d) => `
      <div class="day-block">
        <div class="day-head">
          <span class="day-date">${esc(d.date)}</span>
          <span class="day-week">${weekday(d.date)}</span>
          <span class="day-line"></span>
          <span class="day-count">${d.items.length} 条</span>
        </div>
        ${(filter === '全部' || !filter) && d.highlights.length ? `
        <div class="highlight-box"><h4>当日要点</h4><ul>${d.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul></div>` : ''}
        ${d.items.map((n) => `
          <div class="news-item" data-search="${esc((n.title + n.summary + n.category + n.source).toLowerCase())}">
            <div class="news-time">${esc(n.time || '')}</div>
            <div>
              <div class="news-title"><a href="${safeUrl(n.url)}" target="_blank" rel="noopener">${esc(n.title)}</a></div>
              <div class="news-sum">${esc(n.summary)}</div>
              <div class="news-meta">
                <span class="cat ${esc(n.category)}">${esc(n.category)}</span>
                <span>${esc(n.source)}</span>
                ${n.origin === 'auto' ? '<span class="tag gray">自动采集</span>' : '<span class="tag cyan">人工精选</span>'}
                <a href="${safeUrl(n.url)}" target="_blank" rel="noopener">原文 ↗</a>
              </div>
            </div>
          </div>`).join('')}
      </div>`).join('') || '<div class="empty">该分类下暂无新闻</div>';

    // 侧栏分类统计（基于全部新闻）
    const counts = {};
    newsAll.forEach((n) => { counts[n.category] = (counts[n.category] || 0) + 1; });
    const mx = Math.max(1, ...Object.values(counts));
    $('#cat-stats').innerHTML = CATEGORIES.map((c) => `
      <div class="cat-stat"><span class="nm">${c}</span><span class="tr"><i style="width:${(counts[c] || 0) / mx * 100}%"></i></span><span class="vl">${counts[c] || 0}</span></div>`).join('');

    const fallbackSources = [
      { name: '量子位', host: 'qbitai.com' }, { name: '雷锋网', host: 'leiphone.com' },
      { name: '极客公园', host: 'geekpark.net' }, { name: '钛媒体', host: 'tmtpost.com' },
      { name: 'IT之家', host: 'ithome.com' }, { name: '36氪', host: '36kr.com' },
      { name: 'InfoQ 中文', host: 'infoq.cn' }, { name: '少数派', host: 'sspai.com' },
      { name: 'TechCrunch AI', host: 'techcrunch.com' }, { name: 'The Verge AI', host: 'theverge.com' },
      { name: 'OpenAI Blog', host: 'openai.com' }, { name: 'Google AI', host: 'blog.google' }
    ];
    const srcs = (NEWS.sources && NEWS.sources.length) ? NEWS.sources : fallbackSources;
    $('#rss-sources').innerHTML = srcs.map((s) =>
      `<span><span>${esc(s.name)}</span><em>${esc(s.host)}</em></span>`).join('');
  }

  /* ---------- 研判 ---------- */
  function renderInsights() {
    $('#insights-list').innerHTML = (BASE.insights || []).map((i) => `
      <div class="insight">
        <div class="no">${esc(i.no)}</div>
        <div><h3>${esc(i.title)}</h3><p>${esc(i.body)}</p>
        <div class="foot"><span class="tag amber">${esc(i.tag)}</span><a href="${safeUrl(i.source)}" target="_blank" rel="noopener">查看依据 ↗</a></div></div>
      </div>`).join('');
    $('#refs-list').innerHTML = (BASE.references || []).map((r) => `
      <div class="card" style="padding:15px 18px" data-search="${esc((r.name + r.note).toLowerCase())}">
        <div class="card-title" style="font-size:13.5px"><a href="${safeUrl(r.url)}" target="_blank" rel="noopener">${esc(r.name)} ↗</a></div>
        <div class="card-body" style="margin-top:5px">${esc(r.note)}</div>
      </div>`).join('');
  }

  /* ---------- 渲染入口 ---------- */
  function initFilters() {
    const configs = [
      { sel: '#filter-models', items: ['全部', '闭源旗舰', '开源 / 开放权重', '中国厂商', '海外厂商'], fn: renderModels },
      { sel: '#filter-products', items: ['全部', '全球', '中国'], fn: renderProducts },
      { sel: '#filter-agents', items: ['全部', '通用智能体', '编码智能体', '通用超级智能体', '桌面操作智能体', '多智能体平台', '托管智能体云', '研究智能体', '企业智能体', '个人事务智能体', '企业 IT 智能体'], fn: renderAgents },
      { sel: '#filter-news', items: ['全部', ...CATEGORIES], fn: renderNews }
    ];
    configs.forEach((cfg) => {
      const box = $(cfg.sel);
      if (!box) return;
      box.innerHTML = cfg.items.map((it, i) => `<button class="chip ${i === 0 ? 'active' : ''}" data-v="${esc(it)}">${esc(it)}</button>`).join('');
      box.addEventListener('click', (e) => {
        const btn = e.target.closest('.chip');
        if (!btn) return;
        $$('.chip', box).forEach((c) => c.classList.remove('active'));
        btn.classList.add('active');
        cfg.fn(btn.dataset.v);
      });
      cfg.fn('全部');
    });
  }

  function switchSection(id, updateHash) {
    if (!document.getElementById('sec-' + id)) return;
    $$('.nav-btn').forEach((b) => b.classList.toggle('active', b.dataset.sec === id));
    $$('.section').forEach((s) => s.classList.toggle('active', s.id === 'sec-' + id));
    if (id === 'coders') setTimeout(() => $$('.bar-fill').forEach((b) => { b.style.width = b.dataset.w + '%'; }), 60);
    if (updateHash !== false && location.hash !== '#' + id) {
      history.replaceState(null, '', '#' + id);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function applyHash() {
    const id = (location.hash || '').replace(/^#/, '').trim();
    if (id) switchSection(id, false);
  }

  function initNav() {
    $$('.nav-btn').forEach((b) => b.addEventListener('click', () => switchSection(b.dataset.sec)));
    window.addEventListener('hashchange', applyHash);
  }

  /* ---------- 全局搜索 ---------- */
  let searchTimer = null;
  function initSearch() {
    const input = $('#global-search');
    if (!input) return;
    input.addEventListener('input', () => {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => doSearch(input.value.trim()), 180);
    });
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') { clearTimeout(searchTimer); doSearch(input.value.trim()); } });
  }
  function doSearch(q) {
    // 清除上一次高亮
    $$('mark').forEach((m) => { const p = m.parentNode; p.replaceChild(document.createTextNode(m.textContent), m); p.normalize(); });
    $$('.search-hit').forEach((e) => e.classList.remove('search-hit'));
    if (!q) { $('#search-result').classList.add('hidden'); return; }
    const ql = q.toLowerCase();
    const hits = [];
    $$('.card[data-search], .news-item[data-search]').forEach((el) => {
      if ((el.dataset.search || '').indexOf(ql) >= 0) { el.classList.add('search-hit'); hits.push(el); }
    });
    const box = $('#search-result');
    box.classList.remove('hidden');
    box.innerHTML = hits.length
      ? `找到 <b style="color:var(--cyan)">${hits.length}</b> 条与「${esc(q)}」相关的内容，已定位到对应板块（卡片描边高亮）。<a href="#" id="search-clear" style="margin-left:12px">清除搜索</a>`
      : `没有找到与「${esc(q)}」相关的内容。<a href="#" id="search-clear" style="margin-left:12px">清除搜索</a>`;
    $('#search-clear').addEventListener('click', (e) => {
      e.preventDefault(); $('#global-search').value = ''; doSearch('');
    });
    if (hits.length) {
      const sec = hits[0].closest('.section');
      if (sec && !sec.classList.contains('active')) switchSection(sec.id.replace('sec-', ''));
      setTimeout(() => hits[0].scrollIntoView({ behavior: 'smooth', block: 'center' }), 250);
    }
  }

  /* ---------- 启动 ---------- */
  renderOverview();
  renderCoders();
  renderInsights();
  initFilters();
  initNav();
  initSearch();
  applyHash();
})();
