import {
  Client,
  IntentsBitField,
  Partials,
  Collection,
  ApplicationCommandDataResolvable,
  ClientEvents,
} from "discord.js";

import { BOT_TOKEN } from "../config/config";

import {
  CommandType,
  ComponentsButton,
  ComponentsModal,
  ComponentsSelect,
} from "./types/Command";

import Logging from "../library/Logging";

import fs from "fs";
import path from "path";

import { EventType } from "./types/Event";

/**
 * Determina se um arquivo pode ser
 * carregado dinamicamente pelo sistema.
 *
 * Apenas arquivos JavaScript e TypeScript
 * são considerados módulos válidos.
 *
 * @param fileName Nome do arquivo.
 *
 * @returns Verdadeiro caso o arquivo
 * seja um módulo suportado.
 */
const fileCondition = (fileName: string): boolean =>
  fileName.endsWith(".ts") || fileName.endsWith(".js");

/**
 * Cliente principal da aplicação.
 *
 * Esta classe encapsula toda a lógica
 * de inicialização do bot e funciona
 * como uma extensão do Client nativo
 * do Discord.js.
 *
 * Responsabilidades:
 *
 * - Login na API do Discord
 * - Registro automático de comandos
 * - Registro automático de eventos
 * - Registro de botões
 * - Registro de modais
 * - Registro de selects
 *
 * A estrutura foi projetada para que
 * novos comandos e eventos possam ser
 * adicionados apenas criando arquivos
 * nas respectivas pastas.
 */
export class ExtendedClient extends Client {
  /**
   * Coleção contendo todos os comandos
   * Slash carregados pela aplicação.
   *
   * Chave:
   * - Nome do comando
   *
   * Valor:
   * - Instância da classe Command
   */
  public commands: Collection<string, CommandType> = new Collection();

  /**
   * Coleção contendo todos os botões
   * registrados pelos comandos.
   *
   * Chave:
   * - customId do botão
   */
  public buttons: ComponentsButton = new Collection();

  /**
   * Coleção contendo todos os menus
   * de seleção registrados.
   *
   * Chave:
   * - customId do select
   */
  public selects: ComponentsSelect = new Collection();

  /**
   * Coleção contendo todos os modais
   * registrados.
   *
   * Chave:
   * - customId do modal
   */
  public modals: ComponentsModal = new Collection();

  /**
   * Inicializa o cliente Discord.
   *
   * Configura:
   *
   * - Intents
   * - Partials
   *
   * Atualmente o bot necessita apenas
   * da intent Guilds para funcionamento.
   */
  constructor() {
    super({
      intents: [IntentsBitField.Flags.Guilds],

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

  /**
   * Inicia a aplicação.
   *
   * Fluxo:
   *
   * 1. Carrega comandos.
   * 2. Carrega eventos.
   * 3. Realiza login.
   */
  public start(): void {
    this.registerModules();

    this.registerEvents();

    this.login(BOT_TOKEN);
  }

  /**
   * Registra os Slash Commands
   * na API do Discord.
   *
   * O método é executado apenas
   * após o evento ready.
   *
   * @param commands Lista de comandos
   * carregados dinamicamente.
   */
  private registerCommands(
    commands: Array<ApplicationCommandDataResolvable>,
  ): void {
    this.application?.commands
      .set(commands)

      .then(() => {
        Logging.info("✅ Slash Commands (/) have been set!");
      })

      .catch((error) => {
        Logging.err(error);
      });
  }

  /**
   * Realiza o carregamento dinâmico
   * de todos os comandos da aplicação.
   *
   * Fluxo:
   *
   * 1. Percorre a pasta commands.
   * 2. Importa cada arquivo.
   * 3. Registra o comando.
   * 4. Registra seus componentes.
   * 5. Agenda o deploy dos Slash Commands.
   *
   * Componentes suportados:
   *
   * - Buttons
   * - Select Menus
   * - Modals
   */
  private registerModules(): void {
    const slashCommands: Array<ApplicationCommandDataResolvable> = [];

    const commandsPath = path.join(__dirname, "..", "commands");

    fs.readdirSync(commandsPath).forEach((local) => {
      fs.readdirSync(`${commandsPath}/${local}`)

        .filter(fileCondition)

        .forEach(async (fileName) => {
          const command: CommandType = (
            await import(`../commands/${local}/${fileName}`)
          )?.default;

          const { name, buttons, selects, modals } = command;

          if (!name) {
            return;
          }

          this.commands.set(name, command);

          slashCommands.push(command);

          if (buttons) {
            buttons.forEach((run, key) => this.buttons.set(key, run));
          }

          if (selects) {
            selects.forEach((run, key) => this.selects.set(key, run));
          }

          if (modals) {
            modals.forEach((run, key) => this.modals.set(key, run));
          }
        });
    });

    this.on("ready", () => this.registerCommands(slashCommands));
  }

  /**
   * Realiza o carregamento dinâmico
   * de todos os eventos da aplicação.
   *
   * Fluxo:
   *
   * 1. Percorre a pasta events.
   * 2. Importa os módulos.
   * 3. Registra listeners.
   *
   * Eventos com once=true são
   * registrados através de:
   *
   * client.once(...)
   *
   * Os demais através de:
   *
   * client.on(...)
   */
  private registerEvents(): void {
    const eventsPath = path.join(__dirname, "..", "events");

    fs.readdirSync(eventsPath).forEach((local) => {
      fs.readdirSync(`${eventsPath}/${local}`)

        .forEach(async (fileName) => {
          const { name, once, run }: EventType<keyof ClientEvents> = (
            await import(`../events/${local}/${fileName}`)
          )?.default;

          try {
            if (!name) {
              return;
            }

            once ? this.once(name, run) : this.on(name, run);
          } catch {
            Logging.err("❌ Error setting events!");
          }
        });
    });
  }
}
