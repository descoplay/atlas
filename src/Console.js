const Atlas = require('@desco/atlas')

/**
 * @name Console
 * @description Módulo de mensagens no console do Atlas
 */
class Console {
    /**
     * @name log
     * @description Escreve a mensagem no console
     * @param {String} _msg A mensagem a ser escrita
     * @param {Json} _params Parâmetros adicionais e opcionais
     */
    log (_msg, _params = {}) {
        // Se pediu para não exibir mensagem, ignora o resto
        if ((Atlas.config.Console || {}).notLog) return

        // Se pediu para limpar o console, limpa
        if (_params.clear) require('clear')()

        // Escreve a mensagem
        console.log(_msg)

        // Se pediu para quebrar linha, quebra
        if (_params.breakLine) console.log('')
    }

    /**
     * @name header
     * @description Escreve o cabeçalho do Atlas
     */
    header () {
        this.log('<--- Atlas v2.0.0 -->', { clear: true, breakLine: true, })
    }

    /**
     * @name error
     * @description Escreve uma mensagem de erro do Atlas
     * @params {String} _msg A mensagem a ser escrita
     */
    error (_msg) {
        this.log(_msg)
    }

    /**
     * @name warning
     * @description Escreve uma mensagem de alerta do Atlas
     * @params {String} _msg A mensagem a ser escrita
     */
    warning (_msg) {
        this.log(_msg)
    }

    /**
     * @name success
     * @description Escreve uma mensagem de sucesso do Atlas
     * @params {String} _msg A mensagem a ser escrita
     */
    success (_msg) {
        this.log(_msg)
    }
}

module.exports = new Console()