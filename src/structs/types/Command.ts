import {
  ApplicationCommandData,
  ButtonInteraction,
  Collection,
  CommandInteractionOptionResolver,
  ModalSubmitInteraction,
  StringSelectMenuInteraction,
  ChatInputCommandInteraction,
} from "discord.js";

import { ExtendedClient } from "../ExtendedClient";

/**
 * Propriedades disponibilizadas para a execução
 * de um comando da aplicação.
 *
 * Este objeto é injetado automaticamente pelo
 * sistema de comandos do bot sempre que um
 * Slash Command é executado.
 */
interface CommandProps {
  /**
   * Instância principal do bot.
   *
   * Permite acesso a:
   * - Coleções
   * - Cache
   * - Configurações
   * - Métodos utilitários
   */
  client: ExtendedClient;

  /**
   * Interação recebida do Discord.
   *
   * Por utilizar ChatInputCommandInteraction,
   * disponibiliza acesso tipado aos parâmetros:
   *
   * interaction.options.getString(...)
   * interaction.options.getInteger(...)
   * interaction.options.getBoolean(...)
   * interaction.options.getUser(...)
   */
  interaction: ChatInputCommandInteraction;

  /**
   * Resolver de opções do comando.
   *
   * Mantido para compatibilidade e acesso
   * direto aos parâmetros enviados.
   */
  options: CommandInteractionOptionResolver;
}

/**
 * Coleção de botões registrados em um comando.
 *
 * Cada item da Collection representa:
 *
 * chave => customId do botão
 * valor => callback executado ao clicar
 *
 * Exemplo:
 *
 * buttons: new Collection([
 *   [
 *     "confirm",
 *     interaction => {}
 *   ]
 * ])
 */
export type ComponentsButton = Collection<
  string,
  (interaction: ButtonInteraction) => any
>;

/**
 * Coleção de menus de seleção registrados
 * em um comando.
 *
 * chave => customId do select
 * valor => callback executado ao selecionar
 * uma opção.
 */
export type ComponentsSelect = Collection<
  string,
  (interaction: StringSelectMenuInteraction) => any
>;

/**
 * Coleção de modais registrados em um comando.
 *
 * chave => customId do modal
 * valor => callback executado quando o modal
 * for submetido pelo usuário.
 */
export type ComponentsModal = Collection<
  string,
  (interaction: ModalSubmitInteraction) => any
>;

/**
 * Componentes interativos opcionais
 * que podem ser associados a um comando.
 *
 * Um comando pode possuir:
 *
 * - Botões
 * - Menus de seleção
 * - Modais
 *
 * Todos são opcionais.
 */
interface CommandComponents {
  /**
   * Coleção de botões.
   */
  buttons?: ComponentsButton;

  /**
   * Coleção de selects.
   */
  selects?: ComponentsSelect;

  /**
   * Coleção de modais.
   */
  modals?: ComponentsModal;
}

/**
 * Estrutura completa esperada para
 * a criação de um comando.
 *
 * Estende:
 *
 * - ApplicationCommandData
 * - Componentes interativos
 *
 * E exige:
 *
 * - Método run()
 */
export type CommandType = ApplicationCommandData &
  CommandComponents & {
    /**
     * Método executado quando o comando
     * for chamado pelo usuário.
     *
     * @param props Informações da execução
     * do comando.
     */
    run(props: CommandProps): any;
  };

/**
 * Classe responsável por representar
 * um comando da aplicação.
 *
 * Todos os comandos devem ser instanciados
 * através desta classe:
 *
 * Exemplo:
 *
 * export default new Command({
 *   name: "ping",
 *   description: "Ping command",
 *
 *   async run({ interaction }) {
 *     await interaction.reply("Pong!");
 *   }
 * });
 */
export class Command {
  /**
   * Cria uma nova instância de comando.
   *
   * Configurações aplicadas automaticamente:
   *
   * - Desabilita execução em mensagens diretas (DM)
   * - Copia todas as propriedades para a instância
   *
   * @param options Configuração do comando.
   */
  constructor(options: CommandType) {
    /**
     * Impede a utilização do comando
     * fora de servidores.
     */
    options.dmPermission = false;

    /**
     * Copia dinamicamente todas as
     * propriedades para a instância.
     */
    Object.assign(this, options);
  }
}
