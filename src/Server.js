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

        // Percorre e executa as rotas de todas as entidades
        Atlas.Imports.get('fs-plus').listSync(routerDir).map(router => {
            // Entidade das rotas
            const entity = path.basename(router).split('.')[0]

            // Executa rotas da entidade
            Atlas.Imports.get(router)({
                Express: this.Express,
                Model: Atlas.Model.load(entity),
                entity,
            })

            // Rotas padrões
            this._defaultRouters(entity)
        })
    }

    async _defaultRouters (_entity) {
        // Modelo da entidade
        const Model = new (await Atlas.Model.load(_entity))()

        // As rotas e seus tipos
        const routersTypes = {}

        // Percorre as rotas do express
        this.Express._router.stack
        // Filtra rotas em branco
            .filter(i => i.route && i.route.path.indexOf(`/${_entity}/`) === 0)
        // Monta json de tipos e paths das rotas
            .map(i => routersTypes[i.route.path] = Object.keys(i.route.methods)[0])

        // Se não tem rota de list, cria padrão
        if (routersTypes[`/${_entity}`] !== 'get') {
            this.Express.get(`/${_entity}`, (req, res) => {
                res.end('list!')
            })
        }

        // Se não tem rota de read, cria padrão
        if (routersTypes[`/${_entity}/:id`] !== 'get') {
            this.Express.get(`/${_entity}/:id`, (req, res) => {
                res.end('read!')
            })
        }

        // Se não tem rota de update, cria padrão
        if (routersTypes[`/${_entity}/:id`] !== 'put') {
            this.Express.put(`/${_entity}/:id`, (req, res) => {
                res.end('update!')
            })
        }

        // Se não tem rota de delete, cria padrão
        if (routersTypes[`/${_entity}/:id`] !== 'delete') {
            this.Express.delete(`/${_entity}/:id`, (req, res) => {
                res.end('delete!')
            })
        }
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