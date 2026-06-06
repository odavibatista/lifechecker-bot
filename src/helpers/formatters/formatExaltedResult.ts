/**
 * Formata o resultado de uma rolagem
 * utilizando as regras do sistema Exalted.
 *
 * Recebe os valores obtidos em cada dado
 * e a quantidade total de sucessos calculada
 * pela camada de domínio.
 *
 * O resultado é convertido para uma string
 * amigável para exibição em mensagens do
 * Discord.
 *
 * Exemplo:
 *
 * Entrada:
 *
 * rolls = [10, 8, 7, 4, 2]
 * successes = 4
 *
 * Saída:
 *
 * 🎲 Rolagens
 *
 * 10 | 8 | 7 | 4 | 2
 *
 * Sucessos: 4
 *
 * Esta função possui apenas responsabilidade
 * de apresentação, mantendo a lógica de cálculo
 * de sucessos desacoplada da camada de interface.
 *
 * Casos de uso:
 *
 * - Comandos Slash do Discord
 * - Embeds
 * - Logs de combate
 * - Sistemas de RPG
 *
 * @param rolls Resultados individuais dos
 * dados rolados.
 *
 * @param successes Quantidade total de
 * sucessos obtidos na rolagem.
 *
 * @returns String formatada pronta para
 * ser enviada ao Discord.
 */
export function formatExaltedResult(
  rolls: number[],
  successes: number
): string {

  return `
🎲 Rolagens

${rolls.join(" | ")}

Sucessos: ${successes}
`;

}