const { ethers } = require("ethers");

async function requestFaucet({ address }) {
  if (!ethers.isAddress(address)) {
    return { success: false, message: "这个地址格式不太对哦，应该是 0x 开头的一串字符~" };
  }

  try {
    const response = await fetch("https://testnet.monad.xyz/faucet", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address, token: "MON" })
    });

    if (!response.ok) {
      const text = await response.text();
      if (text.includes("rate") || text.includes("limit")) {
        return { success: false, message: "领得太频繁啦，等几分钟再试试~每天每地址有限额的" };
      }
      return { success: false, message: "水龙头暂时出问题了，稍后再试试吧" };
    }

    return { success: true, message: `已向 ${address.slice(0,6)}...${address.slice(-4)} 发送 0.1 MON 测试币！`, address };
  } catch {
    return { success: false, message: "水龙头暂时连不上，可能是网络问题，等会儿再试试~" };
  }
}

module.exports = requestFaucet;
