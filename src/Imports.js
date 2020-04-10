const objectMap = require('object.map')

/**
 * @name Imports
 * @description Módulo responsável pelas importações de pacotes de terceiros e troca de importações
 */
class Imports {
    // Define propriedades padrões
    constructor () {
        this.defaults()
    }

    // Define propriedades padrões
    defaults () {
        this.packages = {}
        this.originalConsole = {}
    }

    /**
     * @name get
     * @description Retorna a importação desejada
     * @param {String} _name Nome do módulo a ser importado
     * @returns {*} Pacote importado
     */
    get (_name) {
        return this.packages[_name] || require(_name)
    }

    /**
     * @name define
     * @description Define valor persistente de uma importação
     * @param {String} _name Nome do pacote a ser importado
     * @param {*} _value Valor persistente do pacote a ser importado
     */
    define (_name, _value) {
        this.packages[_name] = _value
    }

    /**
     * @name defineConsole
     * @description Define um novo comportamento para uma função do console
     * @param {String} _name Nome da função a ser alterada
     * @param {*} _value Novo compotamento da função
     */
    defineConsole (_name, _value) {
        this.originalConsole[_name] = console[_name]

        console[_name] = _value
    }

    /**
     * @name undefine
     * @description Reverte a definição de valor persistente de uma importação
     * @param {String} _name Nome do pacote a ter importação normalizada
     */
    undefine (_name) {
        delete this.packages[_name]
    }

    /**
     * @name undefineConsole
     * @description Reverte o comportamento original de um método console
     * @param {String} _name Nome do método a ser restaurado
     */
    undefineConsole (_name) {
        console[_name] = this.originalConsole[_name]
    }

    /**
     * @name undefineAll
     * @description Reverte todas as definições
     */
    undefineAll () {
        // Restaura comportamentos originais dos métodos do Console
        objectMap(this.originalConsole, (v, k) => {
            this.undefineConsole(k)
        })

        // Limpa propriedades
        this.defaults()
    }
}

module.exports = new Imports()