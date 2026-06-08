/**
 * Formata o resultado de uma
 * rolagem de iniciativa para
 * exibição no Discord.
 *
 * A iniciativa é calculada através
 * da fórmula:
 *
 * D20 + modificador
 *
 * Exemplo:
 *
 * formatInitiativeResult(
 *   15,
 *   3,
 *   18
 * );
 *
 * Saída:
 *
 * ⚔️ Rolagem de Iniciativa
 *
 * 🎲 D20: 15
 * ➕ Modificador: +3
 *
 * 📊 Resultado Final: 18
 *
 * @param roll Resultado obtido no D20.
 *
 * @param modifier Modificador aplicado
 * à iniciativa.
 *
 * @param total Resultado final da
 * iniciativa após a soma.
 *
 * @returns Mensagem formatada para
 * exibição no Discord.
 */
export function formatInitiativeResult(
  roll: number,
  modifier: number,
  total: number,
): string {
  return `
⚔️ **Rolagem de Iniciativa**

🎲 D20: **${roll}**

➕ Modificador: **${modifier >= 0 ? `+${modifier}` : modifier}**

📊 Resultado Final: **${total}**
`;
}
