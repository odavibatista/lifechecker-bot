/**
 * Serviço responsável por simular
 * o lançamento de uma moeda.
 *
 * Retorna aleatoriamente um dos
 * dois lados possíveis:
 *
 * - Heads (Cara)
 * - Tails (Coroa)
 *
 * Este serviço foi isolado da camada
 * de comandos para facilitar:
 *
 * - Reutilização
 * - Testes unitários
 * - Manutenção
 *
 * Exemplo:
 *
 * const coinFlipService =
 *   new CoinFlipService();
 *
 * const result =
 *   coinFlipService.execute();
 *
 * console.log(result);
 */
export class CoinFlipService {
  /**
   * Executa o lançamento da moeda.
   *
   * Um valor aleatório entre 0 e 1
   * é gerado através do Math.random().
   *
   * Se o valor for maior ou igual a 0.5:
   * retorna "Heads".
   *
   * Caso contrário:
   * retorna "Tails".
   *
   * @returns {"Heads" | "Tails"}
   * O resultado do lançamento.
   */
  execute(): "Heads" | "Tails" {
    return Math.random() >= 0.5 ? "Heads" : "Tails";
  }
}
