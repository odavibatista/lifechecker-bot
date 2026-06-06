/**
 * Gera um número inteiro aleatório dentro
 * de um intervalo informado.
 *
 * O valor retornado é inclusivo, ou seja,
 * tanto o valor mínimo quanto o máximo
 * possuem chance de serem sorteados.
 *
 * Exemplos:
 *
 * randomInt(1, 6);
 * // Pode retornar: 1, 2, 3, 4, 5 ou 6
 *
 * randomInt(1, 20);
 * // Pode retornar qualquer valor entre
 * // 1 e 20
 *
 * Esta função é utilizada como helper
 * para centralizar a geração de números
 * aleatórios em todo o projeto.
 *
 * Casos de uso:
 *
 * - Rolagens de dados
 * - Coin Flip
 * - Sorteios
 * - Mecânicas de RPG
 *
 * @param min Valor mínimo permitido.
 * @param max Valor máximo permitido.
 *
 * @returns Número inteiro aleatório entre
 * @throws Error se o valor mínimo for maior
 * que o valor máximo.
 * min e max (inclusive).
 */
export function randomInt(min: number, max: number): number {
  if (min > max) {
    throw new Error("Minimum value cannot be greater than maximum value.");
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
