/**
 * Contrato para serviços responsáveis
 * por calcular sucessos em sistemas
 * baseados em pools de dados.
 *
 * Implementações:
 *
 * - ExaltedService
 * - VtmService
 * - StorytellerService
 *
 * Exemplo:
 *
 * class ExaltedService
 *   implements SuccessCalculator
 */
export interface SuccessCalculator {
  /**
   * Calcula a quantidade de sucessos
   * obtidos em uma rolagem.
   *
   * @param rolls Resultados individuais
   * dos dados rolados.
   *
   * @returns Quantidade total de sucessos.
   */
  calculateSuccesses(rolls: number[]): number;
}
