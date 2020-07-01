let Express

/**
 * @name Server
 * @description Módulo de servidor do Atlas
 */
class Server {
    /**
     * @name start
     * @description Inicia o servidor
     */
    start () {
        // Importa o express
        Express = global.Atlas.Imports.get('express')()

        // Executa o roteamento
        this._router()

        // Deixa o express escutando uma porta
        Express.listen(this.port(), () => {
            global.Atlas.Console.success('Servidor rodando na porta ' + this.port())
        })
    }

    /**
     * @name port
     * @description Retorna a porta a ser utilizada
     * @returns {Number} A porta a ser utilizada
     */
    port () {
        if ((global.Atlas.config.Server || {}).port) {
            return global.Atlas.config.Server.port
        }

        return global.Atlas.serverPort
    }

    /**
     * @name _router
     * @description Executa o roteamento
     */
    _router () {
        Express.get('/get', (_req, _res) => {
            _res.end('get')
        })

        Express.post('/post', (_req, _res) => {
            _res.end('post')
        })

        Express.put('/put', (_req, _res) => {
            _res.end('put')
        })

        Express.delete('/delete', (_req, _res) => {
            _res.end('delete')
        })
    }
}

module.exports = new Server()