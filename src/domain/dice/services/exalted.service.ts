import { SuccessCalculator } from "../types/SuccessCalculator";

/**
 * Valor mínimo necessário para
 * gerar um sucesso.
 */
const SUCCESS_THRESHOLD = 7;

/**
 * Valor que concede sucesso dobrado.
 */
const DOUBLE_SUCCESS_VALUE = 10;

/**
 * Quantidade de sucessos concedidos
 * por um resultado 10.
 */
const DOUBLE_SUCCESS_AMOUNT = 2;

/**
 * Serviço responsável por calcular
 * a quantidade de sucessos obtidos
 * em uma rolagem do sistema Exalted.
 *
 * Regras:
 *
 * - 1 a 6: Falha
 * - 7 a 9: 1 sucesso
 * - 10: 2 sucessos
 *
 * Exemplos:
 *
 * [7, 8, 9]
 * => 3 sucessos
 *
 * [10, 10]
 * => 4 sucessos
 *
 * [10, 8, 3]
 * => 3 sucessos
 *
 * Esta classe possui apenas a responsabilidade
 * de aplicar as regras de pontuação do sistema,
 * mantendo a lógica de rolagem desacoplada.
 */
export class ExaltedService implements SuccessCalculator {

  /**
   * Calcula a quantidade total de sucessos
   * obtidos em uma rolagem Exalted.
   *
   * @param rolls Resultados individuais
   * dos dados D10.
   *
   * @returns Total de sucessos obtidos.
   */
  calculateSuccesses(
    rolls: number[]
  ): number {

    return rolls.reduce(
      (
        successes,
        roll
      ) => {

        if (
          roll ===
          DOUBLE_SUCCESS_VALUE
        ) {
          return (
            successes +
            DOUBLE_SUCCESS_AMOUNT
          );
        }

        if (
          roll >=
          SUCCESS_THRESHOLD
        ) {
          return (
            successes + 1
          );
        }

        return successes;

      },
      0
    );

  }

}