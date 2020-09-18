/**
 * @name Model
 * @description Módulo de modelo do Atlas
 */
class Model {
    /**
     * @name start
     * @description Inicia o modelo
     */
    start () {
        // Define configurações padrões
        this._defaultConfigs()
    }

    /**
     * @name load
     * @description Carrega um modelo
     * @params {String} _entity Entidade do modelo a ser carregado
     */
    async load (_entity) {
        const path = Atlas.Imports.get('path')

        // Diretório dos modelos
        const modelDir = path.join(Atlas.projectDir, Atlas.config.Model.modelsDir)

        // Cria diretório
        await Atlas.Imports.get('make-dir')(modelDir)

        // Importa e retorna
        try {
            return require(path.join(Atlas.projectDir, Atlas.config.Model.modelsDir, _entity))
        }
        catch (e) {
            return undefined
        }
    }

    /**
     * @description Define configurações padrões
     */
    _defaultConfigs () {
        Atlas.config.Model = Atlas.config.Model || {}
        Atlas.config.Model.pk = 'id'
        Atlas.config.Model.modelsDir = Atlas.config.Model.modelsDir || 'models'
    }
}

module.exports = new Model()