// Converte uma string para o formato 'snake-case'
const toSnakeCase = require('to-snake-case')

/**
 * @name GenericModel
 * @description Modelo genérico das entidades
 */
module.exports = class GenericModel {
    constructor () {
        // Nome da entidade
        this.entity = this.constructor.name

        // Tabela da entidade
        this.table = toSnakeCase(this.entity)
    }

    /**
     * @name list
     * @description Lista objetos da entidade
     * @returns {Array} Array com os objetos
     */
    list () {

    }

    /**
     * @name read
     * @description Lê um objeto de uma entidade
     * @params {Number | String} _id Id do objeto
     * @returns {Object} Objeto desejado
     */
    read (_id) {

    }
}