import {TELEGRAM_TOKEN} from "../token.mjs";

let offset = 0;
let isPolling = false;

setInterval(async () => {
  if (isPolling) return;
  isPolling = true;

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/getUpdates?offset=${offset}`);
    const data = await response.json();

    for (const update of data.result) {
      console.log(JSON.stringify(update, null, 2));
      const message = update.message;
      if (message?.text) {
        const replyResponse = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            chat_id: message.chat.id,
            text: `ха-ха я за тобой повторяю: ${message.text}`,
            reply_parameters: {message_id: message.message_id}
          })
        });
        const replyData = await replyResponse.json();
        if (!replyData.ok) {
          throw new Error(`Telegram sendMessage failed: ${replyData.description}`);
        }
      }
      offset = update.update_id + 1;
    }
  } finally {
    isPolling = false;
  }
}, 5000);