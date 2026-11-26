import { telegramApiClient } from "../adapters/telegram-api-client.mjs";

export const echoMessageUseCase = {
  replyDelayMs: 5000,

  async execute({ chatId, text }) {
    setTimeout(
      () => telegramApiClient.sendMessage(chatId, `🐒 I repeat after you: ${text}`),
      this.replyDelayMs,
    );
  },
};
