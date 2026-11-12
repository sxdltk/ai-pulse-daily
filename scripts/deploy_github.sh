#!/usr/bin/env bash
# 一键部署 AI 看板到 GitHub Pages
# 前置条件：已完成 GitHub 登录（gh auth login）
# 可重复运行：已存在的仓库/Pages 配置会被复用，不会重复创建
set -euo pipefail
cd "$(dirname "$0")/.."

REPO="${REPO_NAME:-ai-pulse-daily}"
echo "==> 检查 GitHub 登录态"
gh auth status >/dev/null 2>&1 || { echo "未登录，请先完成 gh auth login"; exit 1; }
USER=$(gh api user --jq .login)
echo "    账号: $USER"

git branch -M main 2>/dev/null || true

if gh repo view "$USER/$REPO" >/dev/null 2>&1; then
  echo "==> 仓库已存在，同步推送"
  git remote remove origin 2>/dev/null || true
  git remote add origin "https://github.com/$USER/$REPO.git"
  git push -u origin main
else
  echo "==> 创建公开仓库并推送代码"
  gh repo create "$REPO" --public --source=. --remote=origin --push
fi

echo "==> 设置默认分支为 main"
gh api -X PATCH "repos/$USER/$REPO" -f default_branch=main >/dev/null || true

echo "==> 开启 GitHub Pages（main 分支 / 根目录）"
PAGES_BODY='{"source":{"branch":"main","path":"/"}}'
if gh api "repos/$USER/$REPO/pages" >/dev/null 2>&1; then
  printf '%s' "$PAGES_BODY" | gh api -X PUT "repos/$USER/$REPO/pages" --input - >/dev/null || true
else
  printf '%s' "$PAGES_BODY" | gh api -X POST "repos/$USER/$REPO/pages" --input - >/dev/null
fi

echo "==> 放开 Actions 写权限（每日自动提交必需）"
printf '%s' '{"default_workflow_permissions":"write","can_approve_pull_request_reviews":true}' \
  | gh api -X PUT "repos/$USER/$REPO/actions/permissions/workflow" --input - >/dev/null \
  || echo "    （权限设置未成功，可稍后在 Settings → Actions → General 手动改为 Read and write）"

echo "==> 触发首次新闻采集"
gh workflow run daily.yml --repo "$USER/$REPO" 2>/dev/null \
  || echo "    （workflow 尚未就绪，稍等片刻可在 Actions 页手动运行）"

echo
echo "部署完成"
echo "  网站: https://$USER.github.io/$REPO/"
echo "  仓库: https://github.com/$USER/$REPO"
