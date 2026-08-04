require("dotenv").config();
const { MossAgent } = require("../backend/agent/engine");

const agent = new MossAgent(
  process.env.OPENAI_API_KEY,
  process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
  process.env.OPENAI_MODEL || "gpt-4o-mini"
);

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.method === "OPTIONS") return res.status(200).end();
  try {
    const { message, history, walletAddress } = req.body || {};
    if (!message) return res.status(400).json({ error: "message is required" });
    const result = await agent.chat(message, history || [], walletAddress);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "AI issue" });
  }
};
