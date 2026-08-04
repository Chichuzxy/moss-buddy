# Moss Buddy 测试文档

## 测试环境
- 服务: http://localhost:3000
- RPC: Monad Testnet (Chain ID 10143)
- AI: OpenAI 兼容 API

## 功能测试

### 1. 服务健康
```bash
curl http://localhost:3000/api/health
```
期望: `{"status":"ok","name":"Moss Buddy"}`

### 2. 概念解释
输入: "什么是 Gas 费"
期望: 返回生动比喻的解释，usedTools 包含 `explain_concept`

### 3. 余额查询
前置: 连接钱包
输入: "帮我查一下钱包余额"
期望: 返回余额数值，usedTools 包含 `query_chain`

### 4. 水龙头
前置: 连接钱包
输入: "领测试币"
期望: 侧边栏打开 faucet.monad.xyz，显示地址+复制按钮+中文操作指引，usedTools 包含 `request_faucet`

### 5. 前端页面
打开 http://localhost:3000
- 聊天界面正常加载
- 提示词每 5 分钟轮换
- 钱包下拉检测 MetaMask/Rabby/OKX/Trust Wallet
- 连接后显示地址
- 水龙头侧边栏显示中文操作指引 + 地址复制

### 6. RPC 自动回退
`.env` 中设置错误 RPC，查询余额应自动回退到 `testnet-rpc.monad.xyz`

## 已知问题
- 水龙头无法完全自动化（需人工过 Cloudflare 验证）
- curl 终端发送中文可能编码异常，建议浏览器测试

## 测试结果
| 项目 | 状态 | 备注 |
|------|------|------|
| 服务健康 | Pass | |
| 概念解释 | Pass | |
| 余额查询 | Pass | 54.78 MON |
| 水龙头 | Pass | 侧边栏+中文指引+地址复制 |
| 前端页面 | Pass | |
| RPC 回退 | Pass | 自动切换可用节点 |
