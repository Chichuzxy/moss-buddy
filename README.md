# Moss Buddy

基于 Moss 框架的 Monad 生态 AI 陪伴式助手，帮助 Web3 新手用自然语言探索 Monad 区块链。

## 解决的问题

Web3 新手面临三大门槛：
1. 领测试币流程复杂，不知道去哪领
2. 查询链上状态需要学区块浏览器和 RPC
3. Web3 术语（Gas、DeFi、NFT）晦涩难懂

Moss Buddy 用对话式 AI 把这三个问题一站式解决。

## 核心功能

### 1. 自然语言领水
说"领测试币"即可，AI 自动打开水龙头侧边栏（英文原版 + 中文操作指引），一键复制钱包地址。

### 2. 链上状态查询
说"查余额"即可查询 Monad 测试网余额、交易状态、区块高度。支持 RPC 自动回退。

### 3. 大白话概念解释
用生动比喻解释 Web3 概念："Gas 费就是加油费"、"私钥是家门钥匙"。支持 5+ 内置比喻，AI 可动态扩展。

## 技术架构

```
frontend/          # 原生 HTML/CSS/JS，暗色主题聊天界面
backend/
  agent/prompt.js  # AI 系统提示词（核心）
  agent/engine.js  # Agent 引擎 + OpenAI Function Calling
  tools/
    faucet.js      # 水龙头引导工具
    query.js       # 链上查询（fetch 直连 RPC，自动回退）
    explain.js     # 概念解释工具
```

- 前端: 原生 HTML/CSS/JS
- 后端: Node.js + Express
- AI: OpenAI 兼容 API + Function Calling
- 链上: fetch 直连 Monad Testnet RPC（ethers-free，自动回退）

## 快速开始

```bash
cp .env.example .env
# 编辑 .env 填入 OPENAI_API_KEY
npm install
npm run dev
```

打开 http://localhost:3000

## 钱包集成

- 自动检测 MetaMask / Rabby / OKX Wallet / Trust Wallet
- 连接后自动填入地址到水龙头和余额查询
- 提示词动态适配（连接前提示连接，连接后显示真实地址）

## Monad Playground 黑客松

参赛项目，eventId=14。目标：让 Web3 新手 30 秒内完成第一次链上交互。
