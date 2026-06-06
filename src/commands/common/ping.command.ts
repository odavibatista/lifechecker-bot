import {
  ActionRowBuilder,
  ApplicationCommandType,
  ButtonBuilder,
  ButtonStyle,
  Collection,
} from "discord.js";

import { Command } from "../../structs/types/Command";

/**
 * Comando responsável por verificar
 * a disponibilidade e responsividade
 * do bot.
 *
 * Ao ser executado:
 *
 * 1. Retorna uma mensagem "Pong!".
 * 2. Exibe um botão interativo.
 * 3. Permite testar o sistema de componentes
 *    da aplicação.
 *
 * Este comando também serve como exemplo
 * de implementação para:
 *
 * - Slash Commands
 * - Buttons
 * - Component Collections
 * - Interaction Handlers
 *
 * Comando:
 *
 * /ping
 */
export default new Command({

  /**
   * Nome do comando registrado
   * na API do Discord.
   */
  name: "ping",

  /**
   * Descrição exibida na interface
   * de Slash Commands.
   */
  description: "Ping the bot",

  /**
   * Define o comando como um
   * Slash Command tradicional.
   */
  type: ApplicationCommandType.ChatInput,

  /**
   * Executado quando o usuário
   * utiliza o comando.
   *
   * Fluxo:
   *
   * 1. Cria um botão interativo.
   * 2. Monta uma Action Row.
   * 3. Responde com "Pong!".
   * 4. Exibe o botão ao usuário.
   *
   * A resposta é enviada como
   * ephemeral, ficando visível
   * apenas para quem executou
   * o comando.
   *
   * @param interaction Interação
   * recebida do Discord.
   */
  run({ interaction }) {

    /**
     * Container responsável por
     * armazenar os componentes
     * enviados junto à mensagem.
     */
    const row =
      new ActionRowBuilder<ButtonBuilder>({
        components: [
          new ButtonBuilder({

            /**
             * Identificador único
             * utilizado para localizar
             * o callback registrado.
             */
            customId: "ping",

            /**
             * Texto exibido
             * no botão.
             */
            label: "Clique aqui",

            /**
             * Estilo visual
             * do componente.
             */
            style:
              ButtonStyle.Success,

          }),
        ],
      });

    /**
     * Envia a resposta do comando.
     */
    interaction.reply({
      ephemeral: true,

      content: "Pong!",

      components: [row],
    });

  },

  /**
   * Coleção contendo os botões
   * registrados por este comando.
   *
   * A chave representa o customId
   * do componente.
   *
   * O valor representa a função
   * executada quando o botão é clicado.
   */
  buttons: new Collection([

    [
      /**
       * Deve corresponder exatamente
       * ao customId definido no botão.
       */
      "ping",

      /**
       * Executado quando o botão
       * é pressionado.
       *
       * Neste exemplo, o botão é removido
       * da mensagem após o clique.
       *
       * Isso demonstra o funcionamento
       * do sistema de componentes
       * implementado pelo bot.
       *
       * @param interaction Interação
       * do botão pressionado.
       */
      async (interaction) => {

        await interaction.update({

          /**
           * Remove todos os componentes
           * da mensagem.
           */
          components: [],

        });

      },

    ],

  ]),

});