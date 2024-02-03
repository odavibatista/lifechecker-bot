import {
  Client,
  IntentsBitField,
  BitFieldResolvable,
  GatewayIntentsString,
  Partials,
  Collection
} from "discord.js";
import { BOT_TOKEN } from "../config/config";
import { CommandType, ComponentsButton, ComponentsModal, ComponentsSelect } from "./types/Command";

export class ExtendedClient extends Client {
    /* Commands of the client */
    public commands: Collection<string, CommandType> = new Collection()

    /* Button components */
    public buttons: ComponentsButton = new Collection()

    /*Select components */
    public selects: ComponentsSelect = new Collection()

    /* Modals */
    public modals: ComponentsModal = new Collection()

  constructor() {
    super({
      intents: Object.keys(IntentsBitField.Flags) as BitFieldResolvable<
        GatewayIntentsString,
        number
      >,
      partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.User,
        Partials.GuildScheduledEvent,
        Partials.Reaction,
        Partials.User,
      ],
    });
  }

  public start() {
    this.login(BOT_TOKEN);
  }
}
