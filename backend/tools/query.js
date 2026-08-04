const { ethers } = require("ethers");

const RPC_URL = process.env.MONAD_RPC_URL || "https://testnet.monad.xyz";

function getProvider() {
  return new ethers.JsonRpcProvider(RPC_URL);
}

async function queryChain({ queryType, address, txHash }) {
  try {
    const provider = getProvider();

    switch (queryType) {
      case "balance": {
        if (!address || !ethers.isAddress(address)) {
          return { success: false, message: "需要提供一个有效的钱包地址 (0x开头)" };
        }
        const balance = await provider.getBalance(address);
        const monBalance = ethers.formatEther(balance);
        return {
          success: true,
          queryType: "balance",
          address,
          balance: monBalance,
          formatted: `${Number(monBalance).toFixed(6)} MON`
        };
      }

      case "tx": {
        if (!txHash) {
          return { success: false, message: "需要提供交易哈希 (tx hash)" };
        }
        const tx = await provider.getTransaction(txHash);
        if (!tx) {
          return { success: false, message: "没找到这笔交易，确认哈希正确吗？"};
        }
        const receipt = await provider.getTransactionReceipt(txHash);
        return {
          success: true,
          queryType: "tx",
          txHash,
          from: tx.from,
          to: tx.to,
          value: ethers.formatEther(tx.value),
          status: receipt ? (receipt.status === 1 ? "成功" : "失败") : "pending"
        };
      }

      case "block": {
        const blockNumber = await provider.getBlockNumber();
        return {
          success: true,
          queryType: "block",
          blockNumber,
          message: `当前 Monad 测试网区块高度: ${blockNumber}`
        };
      }

      default:
        return { success: false, message: "不支持的查询类型" };
    }
  } catch (err) {
    return { success: false, message: `查询出错: ${err.message}` };
  }
}

module.exports = queryChain;
