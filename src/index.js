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

        // Adiciona a instancia do Atlas nas propriedades globais no Node
        global.Atlas = this

        // Escreve o cabeçalho do Atlas na linha de comando
        header()

        // Retorna promessa contendo instancia do Atlas
        return Promise.resolve(this)
    }
}

// Escreve o cabeçalho do Atlas na linha de comando
function header () {
    // Limpa a linha de comando
    require('clear')()

    // Escreve o cabeçalho
    console.log('<--- Atlas v2.0.0 -->')
    console.log('')
}

module.exports = new Atlas()