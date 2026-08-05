# Moss Buddy

基于 Moss 框架的 Monad 生态 AI 陪伴式助手，帮助 Web3 新手用自然语言探索 Monad 区块链。

## 解决的问题

Web3 新手面临三大门槛：
1. 领测试币流程复杂，不知道去哪领
2. 查询链上状态需要学区块浏览器和 RPC
3. Web3 术语（Gas、DeFi、NFT）晦涩难懂

Moss Buddy 用对话式 AI 一站式解决。

## 核心功能

### 1. AI 引导领水
说"领测试币"，右侧弹出面板显示钱包地址（可一键复制），点击按钮打开官方水龙头。AI 全程引导操作。

### 2. 链上状态查询
说"查余额"即可查询 Monad 测试网余额、交易状态、区块高度。fetch 直连 RPC，支持自动回退。

### 3. 大白话概念解释
用生动比喻解释 Web3 概念："Gas 费就是加油费"、"私钥是家门钥匙"。5+ 内置比喻，AI 可动态扩展。

## 技术架构

```
frontend/          # 原生 HTML/CSS/JS，暖色主题，响应式布局
backend/
  server.js        # Express 本地开发服务器
  agent/prompt.js  # AI 系统提示词（核心）
  agent/engine.js  # Agent 引擎 + OpenAI Function Calling
  tools/
    faucet.js      # 水龙头引导工具
    query.js       # 链上查询（fetch 直连 RPC，自动回退）
    explain.js     # 概念解释工具
api/
  chat.js          # Vercel serverless - POST /api/chat
  health.js        # Vercel serverless - GET /api/health
vercel.json        # Vercel 部署配置
```

- 前端: 原生 HTML/CSS/JS
- 后端: Node.js + Express
- AI: OpenAI 兼容 API + Function Calling
- 链上: fetch 直连 Monad Testnet RPC（ethers-free，自动回退）
- 部署: Vercel

## 快速开始

```bash
cp .env.example .env
# 编辑 .env 填入 OPENAI_API_KEY
npm install
npm run dev
```

打开 http://localhost:3000

## 钱包集成

- 自动检测 MetaMask / Rabby / OKX Wallet / Trust Wallet（带图标）
- 连接后自动填入地址到水龙头和余额查询
- 提示词动态适配

## 设计理念

- 温暖友好的橙色调，降低新手焦虑
- 禁止 Markdown 加粗，干净自然的回复格式
- 中文操作指引覆盖英文水龙头页面

## Monad Playground 黑客松

参赛项目，eventId=14。目标：让 Web3 新手 30 秒内完成第一次链上交互。
