/**
 * Valida o modificador utilizado
 * em uma rolagem de iniciativa.
 *
 * O modificador deve estar dentro
 * de uma faixa considerada válida
 * para evitar entradas absurdamente
 * altas ou baixas.
 *
 * Faixa permitida:
 *
 * - Mínimo: -50
 * - Máximo: 50
 *
 * Exemplos válidos:
 *
 * validateInitiativeModifier(0);
 * validateInitiativeModifier(5);
 * validateInitiativeModifier(-3);
 * validateInitiativeModifier(50);
 * validateInitiativeModifier(-50);
 *
 * Exemplos inválidos:
 *
 * validateInitiativeModifier(51);
 * validateInitiativeModifier(-51);
 *
 * @param modifier Modificador de iniciativa
 * informado pelo usuário.
 *
 * @throws {Error}
 * Lançado quando o modificador estiver
 * fora da faixa permitida.
 */
export function validateInitiativeModifier(modifier: number): void {
  if (modifier < -50 || modifier > 50) {
    throw new Error("Modifier must be between -50 and 50.");
  }
}
