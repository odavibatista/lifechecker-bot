import { ExtendedClient } from "./structs/ExtendedClient";
export * from "colors";
import Logging from "./library/Logging";

import colors from "./colors.json"

const client = new ExtendedClient();

client.start();

export { client, colors };

client.on("ready", () => {
    Logging.info(`Logged in as ${client.user?.displayName}`);
});

