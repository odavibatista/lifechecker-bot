import {
  ApplicationCommandType,
} from "discord.js";

import { Command } from "../../structs/types/Command";

import { CoinFlip } from "../../domain/coin/CoinFlip";

/**
 * Comando responsável por simular
 * o lançamento de uma moeda.
 *
 * O resultado pode ser:
 *
 * - Heads (Cara)
 * - Tails (Coroa)
 *
 * Casos de uso:
 *
 * - Decisões rápidas
 * - Jogos de RPG
 * - Sorteios simples
 * - Desempates
 *
 * Exemplo:
 *
 * /coin
 *
 * O comando utiliza o domínio
 * CoinFlip para executar a lógica
 * de sorteio, mantendo a regra de
 * negócio desacoplada da camada
 * de interação com o Discord.
 */
export default new Command({

  /**
   * Nome registrado na API
   * de Slash Commands.
   */
  name: "coin",

  /**
   * Descrição exibida na lista
   * de comandos do Discord.
   */
  description:
    "Lança uma moeda e retorna cara ou coroa",

  /**
   * Define o comando como
   * Slash Command.
   */
  type:
    ApplicationCommandType.ChatInput,

  /**
   * Executado quando o usuário
   * utiliza o comando.
   *
   * Fluxo:
   *
   * 1. Instancia o domínio CoinFlip.
   * 2. Executa o lançamento.
   * 3. Retorna o resultado ao usuário.
   *
   * @param interaction Interação
   * recebida pelo Discord.
   */
  async run({ interaction }) {

    /**
     * Serviço responsável por
     * simular o lançamento da moeda.
     */
    const coinFlip =
      new CoinFlip();

    /**
     * Resultado do lançamento.
     */
    const result =
      coinFlip.execute();

    /**
     * Retorna o resultado
     * para o usuário.
     */
    await interaction.reply({

      content: `
🪙 **Lançamento de Moeda**

Resultado:

# ${result}
      `,

    });

  },

});