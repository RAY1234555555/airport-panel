# Airport Panel Frontend

前端基于 React 和 Vite，部署到 CloudFlare Pages，与 CloudFlare Workers 后端交互。

## 安装与开发
1. 克隆仓库：`git clone https://github.com/RAY1234555555/airport-panel.git`
2. 安装依赖：`npm install`
3. 运行开发服务器：`npm run dev`

## 部署
- 使用 CloudFlare Pages 部署，连接 GitHub 仓库。
- 设置环境变量 `VITE_WORKER_URL` 为后端 Workers URL。
