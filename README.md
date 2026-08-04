# Moss Buddy

基于 Moss 框架的 Monad 生态 AI 陪伴式助手。面向 Web3 新手，用自然语言交互方式帮助用户探索 Monad 区块链。

## 功能

- **自然语言领水** — 说句话就能领测试网 MON 代币
- **链上状态查询** — 查余额、交易状态、区块高度
- **大白话概念解释** — 用生动比喻解释 Gas、DeFi、NFT 等概念

## 技术栈

- 前端：原生 HTML/CSS/JS
- 后端：Node.js + Express
- AI：OpenAI 兼容 API + Function Calling
- 链上：ethers.js + Monad RPC
- 框架：计划集成 Moss (`@themoss/*`)

## 快速开始

```bash
cp .env.example .env
# 编辑 .env 填入 OPENAI_API_KEY
npm install
npm run dev
```

打开 http://localhost:3000

## Monad Playground 黑客松

参赛项目，eventId=14。
