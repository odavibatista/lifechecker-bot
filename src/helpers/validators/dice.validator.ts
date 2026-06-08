/**
 * Valida os parâmetros utilizados em uma
 * rolagem de dados.
 *
 * Esta função garante que os valores
 * recebidos pelo comando estejam dentro
 * de um intervalo aceitável antes da
 * execução da lógica de negócio.
 *
 * Regras atuais:
 *
 * - A quantidade de dados deve ser maior que 0.
 * - O número de faces deve ser maior que 1.
 *
 * Exemplos válidos:
 *
 * validateDice(1, 6);
 * validateDice(5, 20);
 * validateDice(10, 100);
 *
 * Exemplos inválidos:
 *
 * validateDice(0, 20);
 * validateDice(-5, 20);
 * validateDice(3, 1);
 * validateDice(3, 0);
 *
 * Em caso de violação das regras,
 * uma exceção é lançada para impedir
 * a continuidade da execução.
 *
 * @param quantity Quantidade de dados
 * a serem rolados.
 *
 * @param faces Quantidade de faces
 * de cada dado.
 *
 * @throws {Error}
 * Quando a quantidade de dados for
 * menor ou igual a zero.
 *
 * @throws {Error}
 * Quando a quantidade de faces for
 * menor ou igual a um.
 */
export function validateDice(quantity: number, faces: number): void {
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than zero.");
  }

  if (faces <= 1) {
    throw new Error("Faces must be greater than one.");
  }
}
