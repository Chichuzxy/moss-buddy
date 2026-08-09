// 依赖同目录下的 docs_kb.json，移动本文件时需同步移动知识库
const KB = require("./docs_kb.json");

const ENTRIES = Object.values(KB);

function searchDocs({ query }) {
  const q = query.toLowerCase().trim();
  if (!q) {
    return { success: false, message: "请输入要搜索的问题" };
  }

  // 按匹配度打分：标题匹配 > 标签匹配 > 内容匹配
  const scored = ENTRIES.map((entry) => {
    let score = 0;
    if (entry.title.toLowerCase().includes(q)) score += 10;
    for (const tag of entry.tags) {
      if (tag.toLowerCase() === q) score += 8;
      if (tag.toLowerCase().includes(q) || q.includes(tag.toLowerCase())) score += 5;
    }
    // 内容关键词匹配
    const contentLower = entry.content.toLowerCase();
    const words = q.split(/\s+/);
    for (const w of words) {
      if (w.length >= 2 && contentLower.includes(w)) score += 1;
    }
    return { entry, score };
  });

  scored.sort((a, b) => b.score - a.score);

  const top = scored.filter((s) => s.score > 0).slice(0, 2);

  if (top.length === 0) {
    return {
      success: true,
      query,
      results: [],
      message: "Monad 文档中暂未找到相关内容。可以尝试换个问法，或者直接问社区。"
    };
  }

  return {
    success: true,
    query,
    results: top.map((s) => ({
      title: s.entry.title,
      content: s.entry.content,
      source: s.entry.source
    }))
  };
}

module.exports = searchDocs;
