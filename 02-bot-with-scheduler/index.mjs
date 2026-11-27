import { TELEGRAM_TOKEN } from "../token.mjs";

let offset = 0;

setInterval(async () => {
  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/getUpdates?offset=${offset}`);
  const data = await response.json();

  for (const update of data.result) {
    console.log(JSON.stringify(update, null, 2));
    offset = update.update_id + 1;

    if (!update.message?.text) continue;

    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: update.message.chat.id,
        text: `🐒 I repeat after you: ${update.message.text}`,
      }),
    });
  }
}, 5000)