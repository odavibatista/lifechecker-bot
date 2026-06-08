import { client } from "../..";
import { Event } from "../../structs/types/Event";

/**
 * Evento responsável por tratar todas as
 * interações de componentes do Discord.
 *
 * Este listener centraliza o tratamento de:
 *
 * - Modais (ModalSubmitInteraction)
 * - Botões (ButtonInteraction)
 * - Menus de seleção (StringSelectMenuInteraction)
 *
 * O fluxo funciona através de Collections
 * registradas na instância principal do bot.
 *
 * Exemplo:
 *
 * client.buttons.set(
 *   "confirm",
 *   interaction => {}
 * );
 *
 * Quando um componente é acionado,
 * seu customId é utilizado para localizar
 * automaticamente o callback correspondente.
 *
 * Isso permite desacoplar a lógica dos
 * componentes dos eventos globais do Discord.
 */
export default new Event({
  /**
   * Nome do evento emitido pela API do Discord.
   */
  name: "interactionCreate",

  /**
   * Executado sempre que uma interação é criada.
   *
   * Este método identifica o tipo da interação
   * recebida e delega sua execução para a
   * Collection correspondente.
   *
   * Fluxo:
   *
   * 1. Usuário interage com um componente.
   * 2. Discord dispara interactionCreate.
   * 3. O tipo da interação é identificado.
   * 4. O callback é recuperado pelo customId.
   * 5. O callback é executado.
   *
   * @param interaction Interação recebida
   * pela API do Discord.
   */
  run(interaction) {
    /**
     * Tratamento de submissões de modal.
     *
     * Procura o callback registrado na
     * Collection de modais utilizando
     * o customId enviado pelo Discord.
     */
    if (interaction.isModalSubmit())
      client.modals.get(interaction.customId)?.(interaction);

    /**
     * Tratamento de cliques em botões.
     *
     * Procura o callback registrado na
     * Collection de botões utilizando
     * o customId enviado pelo Discord.
     */
    if (interaction.isButton())
      client.buttons.get(interaction.customId)?.(interaction);

    /**
     * Tratamento de menus de seleção.
     *
     * Procura o callback registrado na
     * Collection de selects utilizando
     * o customId enviado pelo Discord.
     */
    if (interaction.isStringSelectMenu())
      client.selects.get(interaction.customId)?.(interaction);
  },
});
