#!/usr/bin/env bash
# AI 全景观察 · 每日更新入口（供 crontab / 手动调用）
set -euo pipefail
cd "$(dirname "$0")/.."

PYTHON_BIN="${PYTHON_BIN:-python3}"
if ! command -v "$PYTHON_BIN" >/dev/null 2>&1; then
  # 真正的兜底：换一个不同的解释器，而不是把变量设回原值
  if command -v python3.11 >/dev/null 2>&1; then
    PYTHON_BIN=python3.11
  else
    echo "错误：找不到可用的 Python 解释器（已尝试 ${PYTHON_BIN} 与 python3.11）" >&2
    exit 1
  fi
fi

echo "=============================================="
echo " AI 全景观察 · 每日采集 $(date '+%Y-%m-%d %H:%M:%S %z')"
echo " 解释器: $PYTHON_BIN"
echo "=============================================="
"$PYTHON_BIN" scripts/daily_update.py "$@"
echo "完成。"
