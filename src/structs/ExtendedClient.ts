import {
  Client,
  IntentsBitField,
  BitFieldResolvable,
  GatewayIntentsString,
  Partials,
  Collection,
  ApplicationCommandDataResolvable
} from "discord.js";
import { BOT_TOKEN } from "../config/config";
import { CommandType, ComponentsButton, ComponentsModal, ComponentsSelect } from "./types/Command";
import Logging from "../library/Logging";
import fs from "fs"
import path from "path"

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

  /* Starting  */
  public start() {
    this.login(BOT_TOKEN);
  }

  /* Registering the commands  */
  private registerCommands  (commands: Array<ApplicationCommandDataResolvable>)  {
    this.application?.commands.set(commands)
    .then(() => Logging.info("Slash commands registered!"))
    .catch(() => Logging.err("Error while registering slash commands!") )
  }

  /* Registering the modules */
  private registerModules() {
    const slashCommands: Array<ApplicationCommandDataResolvable> = new Array()

    const commandsPath = path.join(__dirname, "..", "commands")

    const fileCondition = (fileName: string) => fileName.endsWith(".ts") || fileName.endsWith(".js")

    fs.readdirSync(commandsPath).forEach(local => {
      fs.readdirSync(commandsPath + `/${local}/`).filter(fileCondition).forEach(async fileName => {
        const command: CommandType = (await import(`../commands/${local}/${fileName}`))?.default

        const { name, buttons, selects, modals } = command

        if  (name)  {
          this.commands.set(name, command)
          slashCommands.push(command)

          if (buttons) buttons.forEach((run, key) => this.buttons.set(key, run))
          if (selects) selects.forEach((run, key) => this.selects.set(key, run))
          if (modals) modals.forEach((run, key) => this.modals.set(key, run))
        }
      })
    })

    this.on("ready", () => this.registerCommands(slashCommands))  
  }
}
