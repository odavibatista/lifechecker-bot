import { randomInt } from "../../../helpers/random/randomInt";
import { RollResult } from "../types/RollResult";

/**
 * Serviço responsável pela execução
 * de rolagens genéricas de dados.
 *
 * Este serviço pode ser utilizado para
 * qualquer sistema baseado em dados,
 * como:
 *
 * - D&D
 * - Pathfinder
 * - Call of Cthulhu
 * - Savage Worlds
 * - Sistemas customizados
 *
 * Exemplos:
 *
 * roll(1, 20)
 * => D20
 *
 * roll(2, 6)
 * => 2D6
 *
 * roll(5, 10)
 * => 5D10
 *
 * O serviço retorna tanto os resultados
 * individuais quanto a soma total dos dados.
 */
export class DiceService {

  /**
   * Executa uma rolagem de dados.
   *
   * Para cada dado solicitado, um valor
   * aleatório é gerado entre 1 e a quantidade
   * de faces informada.
   *
   * Exemplo:
   *
   * roll(3, 6)
   *
   * Possível retorno:
   *
   * {
   *   rolls: [2, 6, 4],
   *   total: 12
   * }
   *
   * @param quantity Quantidade de dados
   * a serem rolados.
   *
   * @param faces Quantidade de faces
   * de cada dado.
   *
   * @returns Objeto contendo:
   *
   * - rolls: resultados individuais.
   * - total: soma dos resultados.
   */
  roll(
    quantity: number,
    faces: number
  ): RollResult {

    const rolls: number[] = [];

    for (
      let i = 0;
      i < quantity;
      i++
    ) {
      rolls.push(
        randomInt(1, faces)
      );
    }

    return {
      rolls,

      total: rolls.reduce(
        (acc, current) =>
          acc + current,
        0
      ),
    };

  }

}