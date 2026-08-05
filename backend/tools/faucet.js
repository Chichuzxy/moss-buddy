async function requestFaucet({ address }) {
  return {
    success: true,
    address,
    message: `右侧面板已弹出！你的地址已显示在上面，点击「打开水龙头领取」按钮，在新页面粘贴地址，完成验证就能领 5 MON。领完回来告诉我，帮你查余额确认！`
  };
}

module.exports = requestFaucet;
