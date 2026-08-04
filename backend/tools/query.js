const PRIMARY_RPC = process.env.MONAD_RPC_URL;
const FALLBACK_RPC = "https://testnet-rpc.monad.xyz";
let currentRpc = null;

async function getRpcUrl() {
  if (currentRpc) return currentRpc;
  const urls = [PRIMARY_RPC, FALLBACK_RPC].filter(Boolean);
  for (const url of urls) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "eth_blockNumber", params: [] }),
        signal: AbortSignal.timeout(5000)
      });
      const data = await res.json();
      if (!data.error) {
        currentRpc = url;
        console.log("RPC connected:", url);
        return url;
      }
    } catch {}
  }
  throw new Error("No working RPC endpoint found");
}

async function rpcCall(method, params = []) {
  const url = await getRpcUrl();
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params })
  });
  const data = await res.json();
  if (data.error) throw new Error(data.error.message);
  return data.result;
}

async function queryChain({ queryType, address, txHash }) {
  try {
    switch (queryType) {
      case "balance": {
        if (!address || !/^0x[0-9a-fA-F]{40}$/.test(address)) {
          return { success: false, message: "需要提供一个有效的钱包地址 (0x开头)" };
        }
        const hex = await rpcCall("eth_getBalance", [address, "latest"]);
        const balance = BigInt(hex);
        const formatted = (Number(balance) / 1e18).toFixed(6);
        return { success: true, queryType: "balance", address, balance: formatted, formatted: `${formatted} MON` };
      }
      case "tx": {
        if (!txHash) return { success: false, message: "需要提供交易哈希" };
        const tx = await rpcCall("eth_getTransactionByHash", [txHash]);
        if (!tx) return { success: false, message: "没找到这笔交易" };
        const receipt = await rpcCall("eth_getTransactionReceipt", [txHash]);
        return {
          success: true, queryType: "tx", txHash,
          from: tx.from, to: tx.to,
          value: (Number(BigInt(tx.value)) / 1e18).toFixed(6),
          status: receipt ? (receipt.status === "0x1" ? "成功" : "失败") : "pending"
        };
      }
      case "block": {
        const hex = await rpcCall("eth_blockNumber");
        return { success: true, queryType: "block", blockNumber: parseInt(hex, 16) };
      }
      default:
        return { success: false, message: "不支持的查询类型" };
    }
  } catch (err) {
    return { success: false, message: `查询出错: ${err.message}` };
  }
}

module.exports = queryChain;
