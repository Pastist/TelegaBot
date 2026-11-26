import {TELEGRAM_TOKEN} from "../../token.mjs";

export const telegramApiClient = {
  async getUpdates(offset) {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/getUpdates?offset=${offset}`);
    const data = await response.json();

    if (!data.ok) {
      throw new Error(`Telegram getUpdates failed: ${data.description}`);
    }

    return data.result;
  },

  async sendReply(chatId, messageId, text) {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        chat_id: chatId,
        text,
        reply_parameters: {message_id: messageId}
      })
    });
    const data = await response.json();

    if (!data.ok) {
      throw new Error(`Telegram sendMessage failed: ${data.description}`);
    }
  }
};
