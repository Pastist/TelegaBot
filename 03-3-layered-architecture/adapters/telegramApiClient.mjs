import {TELEGRAM_TOKEN} from "../../token.mjs";

export const telegramApiClient = {
  baseUrl: `https://api.telegram.org/bot${TELEGRAM_TOKEN}`,

  async getUpdates(offset) {
    const response = await fetch(`${this.baseUrl}/getUpdates?offset=${offset}`);
    const data = await response.json();
    return data.result;
  },

  async sendMessage(chatId, text) {
    await fetch(`${this.baseUrl}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
  },
};