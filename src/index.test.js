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

    test('Se o start() esta escrevendo o cabeçalho', () => {
        const Atlas = require('./index')

        let run = false

        Imports.define('./Console', () => { header: () => run = true })

        const Atlas = require('./Atlas')

        Atlas.start({ Console: { notLog: true, }, })

        Imports.undefineAll()

        expect(run).toEqual(true)
    })
})