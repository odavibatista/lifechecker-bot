import {
  ApplicationCommandType,
  ApplicationCommandOptionType,
} from "discord.js";

import { Command } from "../../structs/types/Command";

import { DiceService } from "../../domain/dice/services/dice.service";
import { validateDice } from "../../helpers/validators/dice.validator";

/**
 * Slash Command responsável por realizar
 * rolagens genéricas de dados.
 *
 * Exemplos:
 * /roll quantity:5 faces:20
 * /roll quantity:10 faces:6
 *
 * O comando utiliza o DiceService para
 * executar a lógica da rolagem e o
 * validateDice para garantir que os
 * parâmetros recebidos são válidos.
 */
export default new Command({
  /**
   * Nome do comando utilizado no Discord.
   */
  name: "roll",

  /**
   * Descrição exibida no menu de Slash Commands.
   */
  description: "Rola uma quantidade personalizada de dados",

  /**
   * Define o comando como Slash Command.
   */
  type: ApplicationCommandType.ChatInput,

  /**
   * Parâmetros aceitos pelo comando.
   */
  options: [
    {
      /**
       * Quantidade de dados a serem rolados.
       *
       * Exemplo:
       * /roll quantity:5
       */
      name: "quantity",

      description: "Quantidade de dados",

      type: ApplicationCommandOptionType.Integer,

      required: true,
    },

    {
      /**
       * Quantidade de faces do dado.
       *
       * Exemplos:
       * D4, D6, D20, D100...
       */
      name: "faces",

      description: "Quantidade de faces",

      type: ApplicationCommandOptionType.Integer,

      required: true,
    },
  ],

  /**
   * Executa a rolagem de dados.
   *
   * Fluxo:
   * 1. Obtém os parâmetros enviados pelo usuário.
   * 2. Valida os parâmetros recebidos.
   * 3. Executa a rolagem através do DiceService.
   * 4. Retorna os resultados ao Discord.
   *
   * Em caso de erro:
   * - Exibe a mensagem gerada pelo validator.
   * - Retorna uma resposta efêmera ao usuário.
   *
   * @param interaction Interação do Slash Command.
   */
  async run({ interaction }) {
    try {
      /**
       * Quantidade de dados selecionada.
       */
      const quantity = interaction.options.getInteger("quantity", true);

      /**
       * Quantidade de faces do dado.
       */
      const faces = interaction.options.getInteger("faces", true);

      /**
       * Valida os valores recebidos antes
       * da execução da rolagem.
       */
      validateDice(quantity, faces);

      /**
       * Serviço responsável pelas regras
       * de negócio da rolagem.
       */
      const diceService = new DiceService();

      /**
       * Resultado da rolagem.
       *
       * Estrutura:
       * {
       *   rolls: number[],
       *   total: number
       * }
       */
      const result = diceService.roll(quantity, faces);

      /**
       * Envia o resultado da rolagem
       * para o usuário.
       */
      await interaction.reply({
        content: `
🎲 **Rolagem de Dados**

Quantidade: **${quantity}**
Faces: **D${faces}**

Resultados:
${result.rolls.join(" | ")}

📊 Total: **${result.total}**
        `,
      });
    } catch (error) {
      /**
       * Tratamento centralizado de erros.
       *
       * Caso o erro tenha sido gerado
       * pelo validator, a mensagem será
       * exibida ao usuário.
       */
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
