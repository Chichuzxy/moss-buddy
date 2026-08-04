async function requestFaucet({ address }) {
  return {
    success: true,
    message: [
      "领 Monad 测试币很简单，跟着做：",
      "",
      "1. 打开 https://faucet.monad.xyz/",
      `2. 粘贴你的地址: ${address.slice(0,6)}...${address.slice(-4)}`,
      "3. 完成人机验证（点一下复选框）",
      "4. 点击领取，每次 5 MON",
      "",
      "提示：这是测试网的假币，只用于开发测试。"
    ].join("\n")
  };
}

module.exports = requestFaucet;
