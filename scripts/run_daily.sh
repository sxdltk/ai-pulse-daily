#!/usr/bin/env bash
# AI 全景观察 · 每日更新入口（供 crontab / 手动调用）
set -euo pipefail
cd "$(dirname "$0")/.."

PYTHON_BIN="${PYTHON_BIN:-python3}"
if ! command -v "$PYTHON_BIN" >/dev/null 2>&1; then
  PYTHON_BIN=python3
fi

echo "=============================================="
echo " AI 全景观察 · 每日采集 $(date '+%Y-%m-%d %H:%M:%S %z')"
echo "=============================================="
"$PYTHON_BIN" scripts/daily_update.py "$@"
echo "完成。"
