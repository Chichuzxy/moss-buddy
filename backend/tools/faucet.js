const FAUCET_URL = "https://faucet.monad.xyz/";

async function requestFaucet({ address }) {
  return {
    success: true,
    faucetUrl: FAUCET_URL,
    address,
    message: `Monad 水龙头有 Cloudflare 人机验证，无法代领。请打开 ${FAUCET_URL}，粘贴地址并完成验证即可领取 5 MON 测试币。`
  };
}

module.exports = requestFaucet;
