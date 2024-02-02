import { Client, IntentsBitField, BitFieldResolvable, GatewayIntentsString, Partials } from "discord.js"
import { BOT_TOKEN } from "../config/config";

export class ExtendedClient extends Client {
    constructor() {
        super({
            intents: Object.keys(IntentsBitField.Flags) as BitFieldResolvable<GatewayIntentsString, number>,
            partials: [
                Partials.Channel, Partials.GuildMember, Partials.Message, Partials.User, Partials.GuildScheduledEvent,
                Partials.Reaction, Partials.User
            ]
        });
    }

    public start()  {
        this.login(BOT_TOKEN)
    }
}