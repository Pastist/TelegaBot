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
      offset = update.update_id + 1;
    }
  } finally {
    isPolling = false;
  }
}, 5000);