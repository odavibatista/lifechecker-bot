/**
 * Representa o resultado de uma rolagem de dados.
 *
 * Utilizado pelos serviços de RPG para retornar
 * os valores individuais obtidos e sua soma total.
 *
 * Exemplo:
 *
 * {
 *   rolls: [4, 6, 1],
 *   total: 11
 * }
 */
export interface RollResult {
  /**
   * Resultado individual de cada dado.
   */
  rolls: number[];

  /**
   * Soma de todos os resultados.
   */
  total: number;
}
