#!/bin/sh
# =============================================================
#  deploy.sh —— VitePress 构建产物自动同步并推送到 rainLyn.github.io
#  触发方式：
#    1. .git/hooks/post-commit  每次 commit 自动执行
#    2. 手动执行                ./scripts/deploy.sh
#  目标仓库可用环境变量覆盖：DEPLOY_DEST=/path/to/dest ./scripts/deploy.sh
# =============================================================
set -eu

# 仓库根目录：无论从何处触发，都精确推导
ROOT=$(git rev-parse --show-toplevel)
DEST="${DEPLOY_DEST:-$ROOT/../Lyn-77.github.io}"

# 只部署 main 分支，避免误把临时分支内容推上线上站点
[ "$(git branch --show-current)" = main ] || { echo "[deploy] 非 main 分支，跳过"; exit 0; }

# 1. 构建。失败即止，绝不推送陈旧产物
cd "$ROOT"
echo "[deploy] pnpm docs:build ..."
pnpm docs:build

# 2. 目标必须存在且是 git 仓库，提前报错而非中途哑火
[ -d "$DEST/.git" ] || { echo "[deploy] 目标仓库不存在: $DEST" >&2; exit 1; }

# 3. 同步构建产物。git add -A 自动记录新增/修改/删除
#    -f：源静态文件可能是只读权限，覆盖失败时删除重建
echo "[deploy] sync dist -> $DEST"
cp -Rf docs/.vitepress/dist/. "$DEST/"

cd "$DEST"
git add -A
if git diff --cached --quiet; then
  echo "[deploy] 无变更，跳过提交与推送"
  exit 0
fi

# 4. 提交 + 推送。commit message 带上源提交标识，便于溯源
git commit -m "deploy: $(git -C "$ROOT" log -1 --format='%h %s')"
git push
echo "[deploy] 完成"
