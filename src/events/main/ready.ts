import { client } from "../.."
import Logging from "../../library/Logging"
import { Event } from "../../structs/types/Event"

export default new Event({
    name: "ready",
    once: true,
    run(interaction) {
    
        const { commands, buttons, selects, modals } = client

        Logging.info(`Bot online!`)
        Logging.data(`Commands loaded: ${commands.size}`)
        Logging.data(`Buttons loaded: ${buttons.size}`)
        Logging.data(`Selects loaded: ${selects.size}`)
        Logging.data(`Modals loaded: ${modals.size}`)
    }
})