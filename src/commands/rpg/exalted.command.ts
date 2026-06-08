import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} from "discord.js";

import { Command } from "../../structs/types/Command";

import { DiceService } from "../../domain/dice/services/dice.service";
import { ExaltedService } from "../../domain/dice/services/exalted.service";

import { validateExaltedDice } from "../../helpers/validators/exalted.validator";
import { formatExaltedResult } from "../../helpers/formatters/formatExaltedResult";

/**
 * Comando responsável por executar
 * rolagens utilizando as regras do
 * sistema Exalted.
 *
 * Regras implementadas:
 *
 * - D10
 * - 7, 8 e 9 = 1 sucesso
 * - 10 = 2 sucessos
 * - 1 a 6 = falha
 *
 * Exemplos:
 *
 * /exalted quantity:5
 *
 * /exalted quantity:12
 *
 * O comando utiliza:
 *
 * - DiceService para gerar os dados
 * - ExaltedService para calcular sucessos
 * - Formatter para exibição
 * - Validator para validação da entrada
 */
export default new Command({
  /**
   * Nome registrado na API do Discord.
   */
  name: "exalted",

  /**
   * Descrição exibida no menu
   * de Slash Commands.
   */
  description: "Executa uma rolagem usando as regras do sistema Exalted",

  /**
   * Tipo do comando.
   */
  type: ApplicationCommandType.ChatInput,

  /**
   * Parâmetros aceitos pelo comando.
   */
  options: [
    {
      /**
       * Quantidade de dados D10
       * que serão rolados.
       */
      name: "quantity",

      description: "Quantidade de dados D10",

      type: ApplicationCommandOptionType.Integer,

      required: true,
    },
  ],

  /**
   * Executado quando o usuário
   * utiliza o comando.
   *
   * Fluxo:
   *
   * 1. Obtém os parâmetros.
   * 2. Valida a entrada.
   * 3. Executa a rolagem.
   * 4. Calcula sucessos.
   * 5. Formata o resultado.
   * 6. Responde ao Discord.
   *
   * @param interaction Interação
   * recebida do Discord.
   */
  async run({ interaction }) {
    try {
      /**
       * Quantidade de dados
       * informada pelo usuário.
       */
      const quantity = interaction.options.getInteger("quantity", true);

      /**
       * Validação dos parâmetros.
       */
      validateExaltedDice(quantity);

      /**
       * Serviço responsável
       * pelas rolagens.
       */
      const diceService = new DiceService();

      /**
       * Serviço responsável
       * pelas regras de sucesso.
       */
      const exaltedService = new ExaltedService();

      /**
       * Rolagem de D10.
       */
      const result = diceService.roll(quantity, 10);

      /**
       * Quantidade total
       * de sucessos obtidos.
       */
      const successes = exaltedService.calculateSuccesses(result.rolls);

      /**
       * Resposta formatada.
       */
      const message = formatExaltedResult(result.rolls, successes);

      await interaction.reply({
        content: message,
      });
    } catch (error) {
      await interaction.reply({
        ephemeral: true,

        content:
          error instanceof Error
            ? `❌ ${error.message}`
            : "❌ Erro ao executar a rolagem.",
      });
    }
  },
});
