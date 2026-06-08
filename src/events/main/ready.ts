import { client } from "../..";
import Logging from "../../library/Logging";
import { Event } from "../../structs/types/Event";

/**
 * Evento executado quando o bot conclui
 * seu processo de inicialização e está
 * pronto para receber eventos da API
 * do Discord.
 *
 * Este evento é disparado apenas uma vez
 * durante o ciclo de vida da aplicação.
 *
 * Responsabilidades:
 *
 * - Confirmar que o bot foi autenticado.
 * - Exibir informações de inicialização.
 * - Informar a quantidade de recursos
 *   carregados em memória.
 *
 * Os dados exibidos ajudam na validação
 * do carregamento correto dos módulos:
 *
 * - Commands
 * - Buttons
 * - Select Menus
 * - Modals
 */
export default new Event({
  /**
   * Nome do evento emitido pelo Discord.js.
   */
  name: "ready",

  /**
   * Indica que o evento deve ser executado
   * apenas uma única vez.
   *
   * Como o evento ready ocorre somente
   * quando o bot finaliza sua conexão,
   * não há necessidade de escutá-lo
   * continuamente.
   */
  once: true,

  /**
   * Executado quando o cliente Discord
   * conclui sua autenticação e carregamento.
   *
   * Fluxo:
   *
   * 1. Discord autentica o bot.
   * 2. Discord.js dispara o evento ready.
   * 3. Os módulos carregados são recuperados.
   * 4. Informações são registradas no log.
   *
   * Essas informações são úteis para:
   *
   * - Debug
   * - Monitoramento
   * - Verificação de carregamento
   * - Diagnóstico de falhas
   *
   * @param interaction Parâmetro fornecido
   * pelo sistema de eventos.
   *
   * Observação:
   * Este evento não utiliza o parâmetro
   * recebido, pois todas as informações
   * necessárias são obtidas através da
   * instância global do cliente.
   */
  run(interaction) {
    /**
     * Collections carregadas pelo bot.
     */
    const { commands, buttons, selects, modals } = client;

    /**
     * Informa que o bot foi iniciado
     * com sucesso.
     */
    Logging.info("Bot online!");

    /**
     * Quantidade de Slash Commands
     * carregados pelo Command Loader.
     */
    Logging.data(`Commands loaded: ${commands.size}`);

    /**
     * Quantidade de botões registrados
     * na aplicação.
     */
    Logging.data(`Buttons loaded: ${buttons.size}`);

    /**
     * Quantidade de menus de seleção
     * registrados na aplicação.
     */
    Logging.data(`Selects loaded: ${selects.size}`);

    /**
     * Quantidade de modais registrados
     * na aplicação.
     */
    Logging.data(`Modals loaded: ${modals.size}`);
  },
});
