import {telegramApiClient} from "../adapters/telegramApiClient.mjs";

export const echoMessageUseCase = {
  replyDelayMs: 5000,

  execute(update) {
    const message = update.message;
    if (!message?.text) return;

    setTimeout(() => {
      telegramApiClient.sendReply(
        message.chat.id,
        message.message_id,
        `ха-ха я за тобой повторяю еще: ${message.text}`
      ).catch(error => console.error("Failed to send echo reply:", error));
    }, this.replyDelayMs);
  }
};
