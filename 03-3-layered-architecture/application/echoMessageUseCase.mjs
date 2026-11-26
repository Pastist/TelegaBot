import {telegramApiClient} from "../adapters/telegramApiClient.mjs";

export const echoMessageUseCase = {
  async execute(update) {
    const message = update.message;
    if (!message?.text) return;

    await new Promise(resolve => setTimeout(resolve, 5000));

    await telegramApiClient.sendReply(
      message.chat.id,
      message.message_id,
      `ха-ха я за тобой повторяю: ${message.text}`
    );
  }
};
