import { ExtendedClient } from "./structs/ExtendedClient";
export * from "colors";
import Logging from "./library/Logging";

import colors from "./colors.json";
import { DANIELS_API_URL, TRATTORIA_API_URL } from "./config/config";

const client = new ExtendedClient();

client.start();

export { client, colors };

client.on("ready", async () => {
  Logging.info(`Logged in as ${client.user?.displayName}`);

  while (true)    {
    const rand = Math.floor(Math.random() * 300000000) + 1
    
    if(rand == 1) {
        await fetch(DANIELS_API_URL + "/ping")
        await fetch(TRATTORIA_API_URL + "/dishes")
        console.log("Healthchecks done!")
    }
  }
});
