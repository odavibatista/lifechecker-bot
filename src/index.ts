import { ExtendedClient } from "./structs/ExtendedClient"
export * from "colors"

const client = new ExtendedClient()

client.start()

export { client }

client.on("ready", () => {
    console.log("Bot online!".green)
})