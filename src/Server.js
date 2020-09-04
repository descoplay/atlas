let Express

const path = require('path')
const makeDir = require('make-dir')
const fs = require('fs-plus')

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
        // Define configurações padrões
        this._defaultConfigs()

        // Importa o express
        Express = global.Atlas.Imports.get('express')()

        // Executa o roteamento
        this._router()

        // Porta a ser usada
        const port = global.Atlas.config.Server.port

        // Deixa o express escutando uma porta
        Express.listen(port, () => {
            global.Atlas.Console.success('Servidor rodando na porta ' + port)
        })
    }

    /**
     * @name _router
     * @description Executa o roteamento
     */
    async _router () {
        const routerDir = path.join(global.Atlas.projectDir, global.Atlas.config.Server.routerDir)

        await makeDir(routerDir)

        fs.listSync(routerDir).map(router => {
            require(router)({
                Express,
                entity: path.basename(router).split('.')[0],
            })
        })

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

    /**
     * @description Define configurações padrões
     */
    _defaultConfigs () {
        global.Atlas.config.Server = global.Atlas.config.Server || {}
        global.Atlas.config.Server.port = global.Atlas.config.Server.port || 3000
        global.Atlas.config.Server.routerDir = global.Atlas.config.Server.routerDir || 'router'
    }
}

module.exports = new Server()