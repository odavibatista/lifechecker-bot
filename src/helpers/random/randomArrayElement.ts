/**
 * Retorna um elemento aleatório de um array.
 *
 * A função seleciona um índice aleatório
 * entre 0 e o tamanho do array menos 1,
 * retornando o elemento correspondente.
 *
 * Exemplos:
 *
 * randomArrayElement([
 *   "Heads",
 *   "Tails"
 * ]);
 *
 * randomArrayElement([
 *   "Warrior",
 *   "Mage",
 *   "Rogue"
 * ]);
 *
 * @template T Tipo dos elementos do array.
 *
 * @param array Array contendo os elementos
 * disponíveis para sorteio.
 *
 * @returns Um elemento aleatório do array.
 *
 * @throws {Error}
 * Caso o array esteja vazio.
 */
export function randomArrayElement<T>(array: T[]): T {
  if (array.length === 0) {
    throw new Error("Cannot select an element from an empty array.");
  }

  const randomIndex = Math.floor(Math.random() * array.length);

  return array[randomIndex];
}
