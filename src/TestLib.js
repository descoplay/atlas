const Imports = require('./Imports')
const path = require('path')

// Biblioteca de propriedades e métodos a serem usados nos testes unitários
module.exports = {
    Imports, // Recurso de importações
    path, // Recurso de diretórios
    // Retorna um módulo limpo
    getModule (_module) {
        const Module = require(_module)

        Imports.undefineAll()

        return Object.create(Object.getPrototypeOf(Module))
    },
}