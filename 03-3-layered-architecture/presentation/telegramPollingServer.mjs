import {telegramApiClient} from "../adapters/telegramApiClient.mjs";
import {echoMessageUseCase} from "../application/echoMessageUseCase.mjs";

export const telegramPollingServer = {
  offset: 0,
  isPolling: false,

  async tick() {
    if (telegramPollingServer.isPolling) return;
    telegramPollingServer.isPolling = true;

    try {
      const updates = await telegramApiClient.getUpdates(telegramPollingServer.offset);

      for (const update of updates) {
        console.log(JSON.stringify(update, null, 2));
        await echoMessageUseCase.execute(update);
        telegramPollingServer.offset = update.update_id + 1;
      }
    } finally {
      telegramPollingServer.isPolling = false;
    }
  },

  start() {
    setInterval(() => {
      telegramPollingServer.tick().catch(error => {
        console.error("Telegram polling failed:", error);
      });
    }, 5000);
  }
};
