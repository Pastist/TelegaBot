import {TELEGRAM_TOKEN} from "../token.mjs";
const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/getUpdates`);
const data = await response.json();

for (const update of data.result) {
	console.log(JSON.stringify(update, null, 2));
}
