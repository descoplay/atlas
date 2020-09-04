const path = require('path')

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
        // Define as propriedades do AtlasJS
        this._defineProps()

        // Recebe as configurações do Atlas
        this.config = { ..._config, }

        // Importa módulos
        this.Imports = require('./Imports')
        this.Console = this.Imports.get('./Console')
        this.Server = this.Imports.get('./Server')

        // Adiciona a instancia do Atlas nas propriedades globais no Node
        global.Atlas = this

        // Escreve o cabeçalho do Atlas na linha de comando
        this.Console.header()

        // Inicia o servidor
        this.Server.start()

        // Retorna promessa contendo instancia do Atlas
        return Promise.resolve(this)
    }

    /**
     * @name _defineProps
     * @description Define as propriedades do Atlas
     * @access private
     */
    _defineProps () {
        // Versão do AtlasJS
        this.version = '2.0.0'

        // Separador do sistema operacional
        this.DS = path.sep

        // Diretório do projeto
        this.projectDir = process.cwd()

        // Diretório do Atlas
        this.atlasDir = __dirname
    }
}

module.exports = new Atlas()