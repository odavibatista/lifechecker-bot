/**
 * Valida os parâmetros utilizados
 * em uma rolagem do sistema Exalted.
 *
 * O sistema Exalted utiliza pools de dados
 * D10, onde cada dado possui regras próprias
 * de sucesso definidas pela camada de domínio.
 *
 * Esta função garante que o usuário não
 * informe valores inválidos ou abusivos
 * para a quantidade de dados.
 *
 * Regras atuais:
 *
 * - A quantidade deve ser maior que zero.
 * - A quantidade máxima permitida é 100.
 *
 * Exemplos válidos:
 *
 * validateExaltedDice(1);
 * validateExaltedDice(10);
 * validateExaltedDice(25);
 *
 * Exemplos inválidos:
 *
 * validateExaltedDice(0);
 * validateExaltedDice(-5);
 * validateExaltedDice(999);
 *
 * Em caso de erro, uma exceção é lançada
 * para interromper a execução do comando.
 *
 * @param quantity Quantidade de dados D10
 * a serem rolados.
 *
 * @throws {Error}
 * Quando a quantidade for menor ou igual a zero.
 *
 * @throws {Error}
 * Quando a quantidade exceder o limite permitido.
 */
export function validateExaltedDice(quantity: number): void {
  if (quantity <= 0) {
    throw new Error("Quantity must be greater than zero.");
  }

  if (quantity > 100) {
    throw new Error("Maximum Exalted dice quantity is 100.");
  }
}
