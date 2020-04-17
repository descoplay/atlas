describe('Atlas', () => {
    const Imports = require('./Imports')

    test('Se start() não teve erro', () => {
        const Atlas = require('./index')

        return Atlas.start({ Console: { notLog: true, }, })
    })

    test('Se o start() esta importando o Imports', () => {
        delete global.Atlas.Imports
        delete global.Atlas

        const Atlas = require('./index')

        Atlas.start({ Console: { notLog: true, }, })

        expect(Atlas.Imports).toBeDefined()
    })

    test('Se o start() esta importando o Console', () => {
        delete global.Atlas.Console
        delete global.Atlas

        const Atlas = require('./index')

        Atlas.start({ Console: { notLog: true, }, })

        expect(Atlas.Console).toBeDefined()
    })

    test('Se o start() esta chamando o método de cabeçalho', () => {
        const Atlas = require('./index')

        let run = false

        Imports.define('./Console', { header: () => run = true })

        Atlas.start({ Console: { notLog: true, }, })

        expect(run).toEqual(true)

        Imports.undefineAll()
    })
})