require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const { MossAgent } = require("./agent/engine");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "frontend")));

const agent = new MossAgent(
  process.env.OPENAI_API_KEY,
  process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
  process.env.OPENAI_MODEL || "gpt-4o-mini"
);

app.post("/api/chat", async (req, res) => {
  try {
    const { message, history } = req.body;
    if (!message) {
      return res.status(400).json({ error: "message is required" });
    }
    const result = await agent.chat(message, history || []);
    res.json(result);
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "AI 暂时不在线，等会儿再试试~" });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", name: "Moss Buddy" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Moss Buddy running at http://localhost:${PORT}`);
});
