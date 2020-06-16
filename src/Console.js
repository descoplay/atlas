const reset = '\x1b[0m' // Reset

const bright = '\x1b[1m' // Brilhante
const underscore = '\x1b[4m' // Sublinhado

const colors = {
    Black: '\x1b[30m', // Preto
    Red: '\x1b[31m', // Vermelho
    Green: '\x1b[32m', // Verde
    Yellow: '\x1b[33m', // Amarelo
    Blue: '\x1b[34m', // Azul
    Magenta: '\x1b[35m', // Magenta
    Cyan: '\x1b[36m', // Ciano
    White: '\x1b[37m', // Branco
}

const fgColors = {
    Black: '\x1b[40m', // Fundo Preto
    Red: '\x1b[41m', // Fundo Vermelho
    Green: '\x1b[42m', // Fundo Verde
    Yellow: '\x1b[43m', // Fundo Amarelo
    Blue: '\x1b[44m', // Fundo Azul
    Magenta: '\x1b[45m', // Fundo Magente
    Cyan: '\x1b[46m', // Fundo Ciano
    White: '\x1b[47m', // Fundo Branco
}

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
        if ((global.Atlas.config.Console || {}).notLog) return

        // Se pediu para limpar o console, limpa
        if (_params.clear) global.Atlas.Imports.get('clear')()

        // Array que conterá todas as formatações
        const format = []

        if (_params.color) format.push(colors[_params.color])
        if (_params.fgColor) format.push(fgColors[_params.fgColor])
        if (_params.underscore) format.push(underscore)
        if (_params.bright) format.push(bright)

        // Escreve a mensagem
        console.log(format.join(''), _msg, reset)

        // Se pediu para quebrar linha, quebra
        if (_params.breakLine) console.log('', '')
    }

    /**
     * @name header
     * @description Escreve o cabeçalho do Atlas
     */
    header () {
        this.log('Atlas v2.0.0', {
            clear: true,
            breakLine: true,
            underscore: true,
            bright: true,
        })
    }

    /**
     * @name error
     * @description Escreve uma mensagem de erro do Atlas
     * @params {String} _msg A mensagem a ser escrita
     * @param {Json} _params Parâmetros adicionais e opcionais
     */
    error (_msg, _params = {}) {
        this.log(_msg, { ..._params, color: 'Red', })
    }

    /**
     * @name warning
     * @description Escreve uma mensagem de alerta do Atlas
     * @params {String} _msg A mensagem a ser escrita
     * @param {Json} _params Parâmetros adicionais e opcionais
     */
    warning (_msg, _params = {}) {
        this.log(_msg, { ..._params, color: 'Yellow', })
    }

    /**
     * @name success
     * @description Escreve uma mensagem de sucesso do Atlas
     * @params {String} _msg A mensagem a ser escrita
     * @param {Json} _params Parâmetros adicionais e opcionais
     */
    success (_msg, _params = {}) {
        this.log(_msg, { ..._params, color: 'Green', })
    }
}

module.exports = new Console()