import { ClientEvents } from "discord.js";

/**
 * Estrutura utilizada para registrar
 * um evento da aplicação.
 *
 * O tipo é baseado diretamente nos eventos
 * nativos disponibilizados pelo Discord.js,
 * garantindo tipagem automática dos parâmetros
 * recebidos em cada callback.
 *
 * Exemplo:
 *
 * new Event({
 *   name: "ready",
 *   once: true,
 *
 *   run(client) {
 *     console.log("Bot online!");
 *   }
 * });
 *
 * @template Key Nome do evento presente
 * em ClientEvents.
 */
export type EventType<Key extends keyof ClientEvents> = {
  /**
   * Nome do evento registrado.
   *
   * Deve corresponder a uma chave válida
   * da interface ClientEvents do Discord.js.
   *
   * Exemplos:
   *
   * - ready
   * - interactionCreate
   * - guildCreate
   * - messageCreate
   */
  name: Key;

  /**
   * Define se o evento deve ser executado
   * apenas uma única vez.
   *
   * Utilizado principalmente em eventos
   * como "ready".
   *
   * @default false
   */
  once?: true;

  /**
   * Callback executado quando o evento
   * for disparado pelo Discord.js.
   *
   * Os parâmetros são inferidos
   * automaticamente através da tipagem
   * de ClientEvents.
   *
   * Exemplo:
   *
   * run(interaction) {}
   *
   * run(message) {}
   *
   * run(member) {}
   */
  run: (...args: ClientEvents[Key]) => void | Promise<void>;
};

/**
 * Classe responsável por representar
 * um evento registrado no sistema.
 *
 * Todos os eventos da aplicação devem
 * ser instanciados através desta classe.
 *
 * Exemplo:
 *
 * export default new Event({
 *   name: "interactionCreate",
 *
 *   run(interaction) {
 *     // lógica do evento
 *   }
 * });
 *
 * O EventLoader é responsável por
 * localizar essas instâncias e registrá-las
 * automaticamente no Client do Discord.
 *
 * @template Key Nome do evento do Discord.
 */
export class Event<Key extends keyof ClientEvents> {
  /**
   * Cria uma nova instância de evento.
   *
   * Todas as propriedades recebidas
   * são copiadas para a instância através
   * de Object.assign.
   *
   * @param options Configuração do evento.
   */
  constructor(options: EventType<Key>) {
    Object.assign(this, options);
  }
}
