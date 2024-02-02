import { ExtendedClient } from "./structs/ExtendedClient";
export * from "colors";
import Logging from "./library/Logging";

const client = new ExtendedClient();

client.start();

export { client };

client.on("ready", () => {
    Logging.info(`Logged in as ${client.user?.displayName}`);
});
