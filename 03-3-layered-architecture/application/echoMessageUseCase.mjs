import {telegramApiClient} from "../adapters/telegramApiClient.mjs";

export const echoMessageUseCase = {
  replyDelayMs: 5000,

  async execute({ chatId, text }) {
    setTimeout(
      () => telegramApiClient.sendMessage(chatId, `я повторяю за тобой: ${text}`),
      this.replyDelayMs,
    );
  },
};
