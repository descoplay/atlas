/**
 * @name Atlas
 * @description Classe principal do framework
 */
class Atlas {
    /**
     * @name start
     * @description Inicia o Atlas
     * @param {JSON} _config Configurações do Atlas
     * @returns {Promise} Promessa contendo uma instancia do Atlas
     */
    start (_config = {}) {
        // Recebe as configurações do Atlas
        this.config = { ..._config, }

        // Importa módulos
        this.Console = require('./Console')

        // Adiciona a instancia do Atlas nas propriedades globais no Node
        global.Atlas = this

        // Escreve o cabeçalho do Atlas na linha de comando
        // header()
        this.Console.header()

        // Retorna promessa contendo instancia do Atlas
        return Promise.resolve(this)
    }
}

module.exports = new Atlas()