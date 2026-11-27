import {telegramApiClient} from "../adapters/telegramApiClient.mjs";
import {echoMessageUseCase} from "../application/echoMessageUseCase.mjs";

export const telegramPollingServer = {
  offset: 0,
  intervalMs: 5000,

  start() {
    setInterval(() => this.poll(), this.intervalMs);
  },

  async poll() {
    const updates = await telegramApiClient.getUpdates(this.offset);

    for (const update of updates) {
      console.log(JSON.stringify(update, null, 2));
      this.offset = update.update_id + 1;

      if (!update.message?.text) continue;

      await echoMessageUseCase.execute({
        chatId: update.message.chat.id,
        text: update.message.text,
      });
    }
  },
};
