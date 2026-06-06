/**
 * Formata os resultados de uma rolagem
 * de dados para exibição ao usuário.
 *
 * Recebe um array contendo os valores
 * individuais obtidos nos dados e os
 * converte para uma string separada
 * por vírgulas.
 *
 * Exemplo:
 *
 * Entrada:
 *
 * [4, 6, 2]
 *
 * Saída:
 *
 * "4, 6, 2"
 *
 * Esta função foi isolada para manter
 * a responsabilidade de apresentação
 * separada da lógica de negócio do
 * DiceService.
 *
 * Casos de uso:
 *
 * - Respostas de Slash Commands
 * - Embeds do Discord
 * - Logs de rolagens
 * - Sistemas de RPG
 *
 * @param rolls Lista contendo os resultados
 * individuais dos dados rolados.
 *
 * @returns String formatada pronta para
 * exibição ao usuário.
 */
export function formatDiceResult(
  rolls: number[]
): string {

  return rolls.join(", ");

}