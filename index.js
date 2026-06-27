{
  "name": "telegram-ai-bot",
  "version": "1.0.0",
  "description": "Telegram AI Bot using Gemini",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "@google/genai": "^1.13.0",
    "dotenv": "^16.4.7",
    "node-telegram-bot-api": "^0.66.0"
  }
      }bot.onText(/\/start/, (msg) => {
  bot.sendMessage(
    msg.chat.id,
    `👋 Hello ${msg.from.first_name}!

मैं आपका AI Assistant हूँ।

आप मुझसे किसी भी विषय पर बात कर सकते हैं।

बस मैसेज भेजिए। 😊`
  );
});bot.on("message", async (msg) => {

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
