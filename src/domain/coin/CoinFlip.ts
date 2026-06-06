import { randomArrayElement } from "../../helpers/random/randomArrayElement";

/**
 * Serviço responsável por simular
 * o lançamento de uma moeda.
 *
 * O resultado pode ser:
 *
 * - Heads (Cara)
 * - Tails (Coroa)
 *
 * A lógica foi isolada em uma classe
 * de domínio para facilitar:
 *
 * - Reutilização
 * - Testes unitários
 * - Manutenção
 * - Evolução futura
 *
 * Exemplo:
 *
 * const coinFlip = new CoinFlip();
 *
 * const result =
 *   coinFlip.execute();
 *
 * console.log(result);
 */
export class CoinFlip {

  /**
   * Executa o lançamento da moeda.
   *
   * Seleciona aleatoriamente um dos
   * lados possíveis através do helper
   * randomArrayElement.
   *
   * @returns {"Heads" | "Tails"}
   * Resultado do lançamento.
   */
  execute(): "Heads" | "Tails" {

    return randomArrayElement([
      "Heads",
      "Tails",
    ]);

  }

}