import { CommandInteractionOptionResolver } from "discord.js";

import { client } from "../..";
import Logging from "../../library/Logging";
import { Event } from "../../structs/types/Event";

/**
 * Evento responsável por interceptar
 * todas as interações criadas no Discord
 * e encaminhar os Slash Commands para
 * seus respectivos handlers.
 *
 * Fluxo:
 *
 * 1. Verifica se a interação recebida
 *    é um Chat Input Command.
 *
 * 2. Busca o comando registrado.
 *
 * 3. Obtém as opções enviadas.
 *
 * 4. Executa o comando.
 *
 * 5. Captura e registra erros globais.
 */
export default new Event({
  /**
   * Nome do evento observado.
   */
  name: "interactionCreate",

  /**
   * Executado sempre que uma nova
   * interação é recebida.
   *
   * @param interaction Interação recebida
   * pelo Discord.
   */
  async run(interaction) {
    /**
     * Ignora interações que não sejam
     * Slash Commands.
     */
    if (!interaction.isChatInputCommand()) {
      return;
    }

    /**
     * Busca o comando registrado.
     */
    const command = client.commands.get(interaction.commandName);

    /**
     * Caso o comando não exista,
     * encerra a execução.
     */
    if (!command) {
      return;
    }

    /**
     * Opções enviadas pelo usuário.
     */
    const options = interaction.options as CommandInteractionOptionResolver;

    try {
      /**
       * Executa o comando.
       */
      await command.run({
        client,
        interaction,
        options,
      });
    } catch (error) {
      /**
       * Registra o erro no sistema
       * de logs da aplicação.
       */
      Logging.err(error);

      /**
       * Evita responder duas vezes
       * à mesma interação.
       */
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          ephemeral: true,
          content: "❌ Ocorreu um erro inesperado ao executar este comando.",
        });

        return;
      }

      await interaction.reply({
        ephemeral: true,
        content: "❌ Ocorreu um erro inesperado ao executar este comando.",
      });
    }
  },
});
