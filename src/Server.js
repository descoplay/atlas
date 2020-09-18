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
        this.Express = Atlas.Imports.get('express')()

        // Executa o roteamento
        this._router()

        // Porta a ser usada
        const port = Atlas.config.Server.port

        // Deixa o express escutando uma porta
        this.Express.listen(port, () => {
            Atlas.Console.success('Servidor rodando na porta ' + port)
        })
    }

    /**
     * @name _router
     * @description Executa o roteamento
     */
    async _router () {
        const path = Atlas.Imports.get('path')

        // Diretório das rotas
        const routerDir = path.join(Atlas.projectDir, Atlas.config.Server.routerDir)

        // Cria diretório
        await Atlas.Imports.get('make-dir')(routerDir)

        // Percorre e executa todos os diretórios
        Atlas.Imports.get('fs-plus').listSync(routerDir).map(router => {
            Atlas.Imports.get(router)({
                Express: this.Express,
                entity: path.basename(router).split('.')[0],
            })
        })
    }

    /**
     * @description Define configurações padrões
     */
    _defaultConfigs () {
        Atlas.config.Server = Atlas.config.Server || {}
        Atlas.config.Server.port = Atlas.config.Server.port || 3000
        Atlas.config.Server.routerDir = Atlas.config.Server.routerDir || 'router'
    }
}

module.exports = new Server()