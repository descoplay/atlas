describe('Atlas', () => {
    const Imports = require('./Imports')

    test('Se start() não teve erro', () => {
        const Atlas = getModule()

        return Atlas.start({ Console: { notLog: true, }, })
    })

    test('Se o start() esta importando o Imports', () => {
        const Atlas = getModule()

        Atlas.start({ Console: { notLog: true, }, })

        expect(Atlas.Imports).toBeDefined()
    })

    test('Se o start() esta importando o Console', () => {
        const Atlas = getModule()

        Atlas.start({ Console: { notLog: true, }, })

        expect(Atlas.Console).toBeDefined()
    })

    test('Se o start() esta chamando o método de cabeçalho', () => {
        const Atlas = getModule()

        let run = false

        Imports.define('./Console', { header: () => run = true, })

        Atlas.start({ Console: { notLog: true, }, })

        expect(run).toEqual(true)
    })

    function getModule () {
        if (global.Atlas) {
            delete global.Atlas.Imports
            delete global.Atlas.Console
            delete global.Atlas
        }

        Imports.undefineAll()

        return require('./index')
    }
})