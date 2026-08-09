# Moss Buddy 测试文档

## 测试环境
- 本地: http://localhost:3000
- 线上: https://moss-buddy.vercel.app
- RPC: Monad Testnet (Chain ID 10143, 自动回退)
- AI: OpenAI 兼容 API

## 功能测试

### 1. AI 对话与概念解释
输入: "什么是 Gas 费" / "什么是 NFT" / "什么是智能合约"
期望: 返回生动比喻（如"加油费"），格式干净无 Markdown，usedTools 含 explain_concept

### 2. 余额查询
前置: 连接钱包
输入: "查余额" / "帮我查一下钱包余额"
期望: 返回余额数值，usedTools 含 query_chain
RPC 自动回退：错误 RPC 时切换到 testnet-rpc.monad.xyz

### 3. 水龙头引导
前置: 连接钱包
输入: "领测试币"
期望: 右侧弹出暖色面板，显示完整地址 + 复制按钮 + 操作指引 + 打开水龙头按钮。关闭面板后聊天区恢复全宽。

### 4. 官方文档搜索（新增）
输入: "Monad 的 TPS 是多少" / "Monad 和以太坊有什么区别" / "Monad 区块时间"
期望: 调用 search_docs 从 Monad 官方文档知识库检索，usedTools 含 search_docs，回答包含具体数据（如 TPS 10,000、区块 300ms）

### 5. 前端页面
- 暖色奶油主题，橙色强调色
- 提示词每 5 分钟轮换
- 钱包下拉检测 MetaMask/Rabby/OKX/Trust Wallet（带 emoji 图标）
- 连接后显示地址简写，提示词自动适配
- 侧边栏打开时聊天区自动缩进

### 6. 钱包集成
- 未安装: 显示 [Install]（黄色），点击跳下载
- 已安装: 显示 [Connect]（蓝色），点击弹授权窗口
- 连接后: 显示地址简写（绿色），自动填入领水和查询

## 已知限制
- 水龙头需要人工完成 Cloudflare 验证（无法绕过）
- vercel.app 国内访问受限（需 VPN）
- 文档搜索基于静态知识库（9 个主题），未实时爬取最新文档

## 测试结果
| 项目 | 状态 | 备注 |
|------|------|------|
| AI 概念解释 | Pass | 比喻生动，格式干净 |
| 余额查询 | Pass | 25 MON，RPC 自动回退 |
| 水龙头引导 | Pass | 侧边栏+地址+复制+按钮 |
| 官方文档搜索 | Pass | TPS 10,000、区块 300ms 等数据准确 |
| 前端 UI | Pass | 暖色主题，响应式布局 |
| 钱包集成 | Pass | 4 款钱包检测+连接 |
