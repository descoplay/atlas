/**
 * @name Db
 * @description Módulo de banco de dados do Atlas
 */
class Db {
    /**
     * @name start
     * @description Inicia o banco de dados
     */
    async start () {
        // Define configurações padrões
        this._defaultConfigs()

        Atlas.Console.log('Conectando ao banco de dados')

        // Conecta ao banco
        return this.Conn.connect()
            .then(() => {
                Atlas.Console.success('Conectado', { ident: 1, })
            })
            .catch(e => {
                Atlas.Console.warning(
                    (
                        'Ocorreu algum problema ao conectar com o banco de dados. ' +
                        'Os dados de acesso estão corretos?'
                    ),
                    { ident: 1, }
                )
            })
    }

    /**
     * @description Define configurações padrões
     */
    _defaultConfigs () {
        Atlas.config.Db = Atlas.config.Db || {}
        Atlas.config.Db.type = Atlas.config.type || 'MySQL'
        Atlas.config.Db.host = Atlas.config.host || 'localhost'
        Atlas.config.Db.user = Atlas.config.user || 'root'

        // Importa conexão solicitada em String
        if (typeof Atlas.config.Db.type === 'string') {
            this.Conn = new (Atlas.Imports.get(`./Db/${Atlas.config.Db.type}`))()
        }

        if (!Atlas.config.Db.port) {
            // Define porta padrão de acordo com o banco
            switch (this.Conn.constructor.name) {
                case 'MySQL': Atlas.config.Db.port = 3306
            }
        }
    }
}

module.exports = new Db()