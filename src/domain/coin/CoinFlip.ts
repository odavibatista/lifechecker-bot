import { randomArrayElement } from "../../helpers/random/randomArrayElement";
import { CoinSide } from "./types/CoinSide";

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
   * @returns {CoinSide}
   * Resultado do lançamento.
   */
  execute(): CoinSide {
    return randomArrayElement([CoinSide.HEADS, CoinSide.TAILS]);
  }
}
