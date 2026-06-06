import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} from "discord.js";

import { Command } from "../../structs/types/Command";

import { DiceService } from "../../domain/dice/services/dice.service";

/**
 * Comando responsável por realizar
 * uma rolagem de iniciativa.
 *
 * A iniciativa é calculada através
 * da fórmula:
 *
 * 1D20 + modificador
 *
 * Exemplos:
 *
 * /initiative modifier:3
 *
 * /initiative modifier:7
 *
 * Casos de uso:
 *
 * - Dungeons & Dragons
 * - Pathfinder
 * - Tormenta
 * - Sistemas derivados de D20
 */
export default new Command({

  /**
   * Nome registrado no Discord.
   */
  name: "initiative",

  /**
   * Descrição exibida no menu
   * de Slash Commands.
   */
  description:
    "Realiza uma rolagem de iniciativa (1D20 + modificador)",

  /**
   * Tipo do comando.
   */
  type:
    ApplicationCommandType.ChatInput,

  /**
   * Opções aceitas pelo comando.
   */
  options: [
    {
      /**
       * Modificador de iniciativa.
       */
      name: "modifier",

      description:
        "Modificador aplicado à iniciativa",

      type:
        ApplicationCommandOptionType.Integer,

      required: true,
    },
  ],

  /**
   * Executado quando o usuário
   * utiliza o comando.
   *
   * Fluxo:
   *
   * 1. Obtém o modificador.
   * 2. Executa um D20.
   * 3. Soma o modificador.
   * 4. Retorna o resultado.
   *
   * @param interaction
   * Interação recebida do Discord.
   */
  async run({ interaction }) {

    try {

      /**
       * Modificador informado.
       */
      const modifier =
        interaction.options.getInteger(
          "modifier",
          true
        );

      /**
       * Serviço responsável
       * pela rolagem.
       */
      const diceService =
        new DiceService();

      /**
       * Executa um D20.
       */
      const result =
        diceService.roll(
          1,
          20
        );

      /**
       * Valor obtido no dado.
       */
      const diceValue =
        result.rolls[0];

      /**
       * Resultado final.
       */
      const total =
        diceValue + modifier;

      await interaction.reply({

        content: `
⚔️ **Rolagem de Iniciativa**

🎲 D20: **${diceValue}**

➕ Modificador: **${modifier >= 0 ? `+${modifier}` : modifier}**

📊 Resultado Final: **${total}**
        `,

      });

    } catch (error) {

      await interaction.reply({

        ephemeral: true,

        content:
          error instanceof Error
            ? `❌ ${error.message}`
            : "❌ Erro ao executar a iniciativa.",

      });

    }

  },

});