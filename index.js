require("dotenv").config();

const TelegramBot = require("node-telegram-bot-api");
const { GoogleGenAI } = require("@google/genai");

const bot = new TelegramBot(process.env.BOT_TOKEN, {
  polling: true,
});

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const memory = {};

console.log("🤖 Rahul AI Started");
bot.onText(/\/start/, (msg) => {

  bot.sendMessage(
    msg.chat.id,

`👋 Hello ${msg.from.first_name}

मैं Rahul AI हूँ।

आप मुझसे किसी भी विषय पर बात कर सकते हैं।

😊`

  );

});
bot.on("message", async (msg) => {

  if (!msg.text) return;

  if (msg.text.startsWith("/")) return;

  const chatId = msg.chat.id;

  if (!memory[chatId]) {
    memory[chatId] = [];
  }

  memory[chatId].push({
    role: "user",
    text: msg.text,
  });

  try {

    const history = memory[chatId]
      .map((m) => `${m.role}: ${m.text}`)
      .join("\n");
        const response = await ai.models.generateContent({

      model: "gemini-2.5-flash",

      contents: `
You are Rahul AI.

You are a friendly AI assistant.

Always answer in the user's language.

Previous Conversation:
${history}

User:
${msg.text}
`

    });

    const reply = response.text;
        memory[chatId].push({
      role: "assistant",
      text: reply,
    });

    bot.sendMessage(chatId, reply);

  } catch (error) {

    console.error(error);

    bot.sendMessage(
      chatId,
      "❌ Sorry, अभी मैं जवाब नहीं दे पा रहा हूँ।"
    );

  }

});
