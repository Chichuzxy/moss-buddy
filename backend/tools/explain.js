const EXPLANATIONS = {
  "gas": {
    beginner: "Gas 费就像汽车的「加油费」——你在 Monad 上做任何操作都需要付一点 MON 当油钱。不过 Monad 的油费超便宜，做一次转账可能只要几分钱！",
    intermediate: "Gas = 计算单价 x 消耗量。Monad 通过并行 EVM 大幅降低 Gas 成本，单笔转账通常 < 0.01 MON。"
  },
  "钱包": {
    beginner: "钱包就像你的「家门钥匙串」——公钥是门牌号（可以告诉别人），私钥是钥匙（打死也不能给）。在 Monad 上，钱包就是你的数字身份。",
    intermediate: "钱包 = 公钥哈希派生地址 + 私钥签名。Monad 完全兼容以太坊钱包（如 MetaMask），只需切换 RPC。"
  },
  "智能合约": {
    beginner: "智能合约就像「自动贩卖机」——你投币（发交易），它自动出货（执行逻辑），不需要中间人。代码即规则，没人能耍赖。",
    intermediate: "智能合约是部署在链上的确定性代码。Monad 完全兼容 EVM 字节码，Solidity 合约可无缝迁移。"
  },
  "defi": {
    beginner: "DeFi（去中心化金融）就像「没有柜台的银行」——存钱、借钱、换钱全部由代码自动处理，24 小时不打烊，不需要任何人审批。",
    intermediate: "DeFi = 链上智能合约实现的金融原语。Monad 的高 TPS 使链上订单簿等高性能 DeFi 成为可能。"
  },
  "nft": {
    beginner: "NFT 就像「数字房产证」——证明某个数字东西（图片、音乐、游戏道具）是你的。每张证都独一无二，不可伪造。",
    intermediate: "NFT = ERC-721/1155 标准的唯一代币。Monad 上 mint NFT 成本极低。"
  }
};

const FALLBACK = {
  beginner: "这个问题问得好！作为一个 Monad 新手，可以这样理解：在区块链世界里，这个概念就像是日常生活中的____。想让我展开讲讲吗？",
  intermediate: "这是个好问题。从技术层面来说，这涉及到 Monad 的____特性。需要我详细解释吗？"
};

function explainConcept({ concept, level = "beginner" }) {
  const key = concept.toLowerCase().trim();

  if (EXPLANATIONS[key]) {
    return {
      success: true,
      concept,
      level,
      explanation: EXPLANATIONS[key][level] || EXPLANATIONS[key].beginner
    };
  }

  return {
    success: true,
    concept,
    level,
    explanation: `关于「${concept}」——${FALLBACK[level] || FALLBACK.beginner}`
  };
}

module.exports = explainConcept;
