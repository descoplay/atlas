let Conn

/**
 * @name MySQL
 * @description Classe de conexão com o banco de dados MySQL
 */
class MySQL {
    /**
     * @name connect
     * @description Conecta ao banco
     */
    async connect () {
        // Importa pacote de conexão
        const MySQL = Atlas.Imports.get('promise-mysql')

        // Se não esta conectado, conecta
        if (!this._connected()) {
            Conn = await MySQL.createPool(Atlas.config.Db)

            // Acesso o banco, se der erro, informa
            return Conn.query('USE ' + Atlas.config.Db.name)
        }
    }

    /**
     * @name query
     * @description Executa um comando SQL
     * @params {String} O SQL a ser executado
     * @returns Promise
     */
    async query (_sql) {
        // Conecta ao banco
        await this.connect()

        // return Conn.query(_sql)
    }

    /**
     * @description Verifica se esta conectado
     * @returns {Boolean}
     */
    _connected () {
        const connected = !!Conn && !Conn.pool._closed

        return connected
    }
}

module.exports = MySQL