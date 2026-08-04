const { SYSTEM_PROMPT } = require("./prompt");
const { OpenAI } = require("openai");

const FAUCET_TOOL = {
  type: "function",
  function: {
    name: "request_faucet",
    description: "为用户申请 Monad 测试网 MON 代币。调用 Monad 官方水龙头。",
    parameters: {
      type: "object",
      properties: {
        address: { type: "string", description: "用户的钱包地址 (0x 开头)" }
      },
      required: ["address"]
    }
  }
};

const QUERY_TOOL = {
  type: "function",
  function: {
    name: "query_chain",
    description: "查询 Monad 链上信息：余额、交易状态等",
    parameters: {
      type: "object",
      properties: {
        queryType: { type: "string", enum: ["balance", "tx", "block"], description: "查询类型" },
        address: { type: "string", description: "钱包地址（查余额时必填）" },
        txHash: { type: "string", description: "交易哈希（查交易时必填）" }
      },
      required: ["queryType"]
    }
  }
};

const EXPLAIN_TOOL = {
  type: "function",
  function: {
    name: "explain_concept",
    description: "用生动比喻解释 Web3 / Monad 概念",
    parameters: {
      type: "object",
      properties: {
        concept: { type: "string", description: "要解释的概念" },
        level: { type: "string", enum: ["beginner", "intermediate"], description: "用户水平", default: "beginner" }
      },
      required: ["concept"]
    }
  }
};

const TOOLS = [FAUCET_TOOL, QUERY_TOOL, EXPLAIN_TOOL];

class MossAgent {
  constructor(apiKey, baseURL, model) {
    this.client = new OpenAI({ apiKey, baseURL });
    this.model = model || "gpt-4o-mini";
    this.toolHandlers = {
      request_faucet: require("../tools/faucet"),
      query_chain: require("../tools/query"),
      explain_concept: require("../tools/explain")
    };
  }

  async chat(message, history = []) {
    const messages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...history,
      { role: "user", content: message }
    ];

    const response = await this.client.chat.completions.create({
      model: this.model,
      messages,
      tools: TOOLS,
      tool_choice: "auto",
      temperature: 0.8,
      max_tokens: 600
    });

    const choice = response.choices[0];
    const assistantMessage = choice.message;

    if (assistantMessage.tool_calls && assistantMessage.tool_calls.length > 0) {
      const toolResults = [];
      for (const call of assistantMessage.tool_calls) {
        const handler = this.toolHandlers[call.function.name];
        if (handler) {
          try {
            const args = JSON.parse(call.function.arguments);
            const result = await handler(args);
            toolResults.push({
              role: "tool",
              tool_call_id: call.id,
              content: JSON.stringify(result)
            });
          } catch (err) {
            toolResults.push({
              role: "tool",
              tool_call_id: call.id,
              content: JSON.stringify({ error: err.message })
            });
          }
        }
      }

      messages.push(assistantMessage);
      messages.push(...toolResults);

      const finalResponse = await this.client.chat.completions.create({
        model: this.model,
        messages,
        temperature: 0.8,
        max_tokens: 600
      });

      return { content: finalResponse.choices[0].message.content, usedTools: assistantMessage.tool_calls.map(c => c.function.name) };
    }

    return { content: assistantMessage.content, usedTools: [] };
  }
}

module.exports = { MossAgent };
