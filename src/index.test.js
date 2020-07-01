describe('Atlas', () => {
    const TestLib = require('./TestLib')

    describe('start()', () => {
        test('Se não teve erro', () => {
            const Atlas = getModule()

            return Atlas.start({ Console: { notLog: true, }, })
        })

        test('Se esta importando o Imports', () => {
            const Atlas = getModule()

            Atlas.start({ Console: { notLog: true, }, })

            expect(Atlas.Imports).toBeDefined()
        })

        test('Se esta importando o Console', () => {
            const Atlas = getModule()

            Atlas.start({ Console: { notLog: true, }, })

            expect(Atlas.Console).toBeDefined()
        })

        test('Se esta chamando o método de cabeçalho', () => {
            const Atlas = getModule()

            let run = false

            TestLib.Imports.define('./Console', { header: () => run = true, })

            Atlas.start({ Console: { notLog: true, }, })

            expect(run).toEqual(true)
        })
    })

    describe('_defineProps', () => {
        test('Se esta definindo tudo corretamente', () => {
            const Atlas = getModule()

            Atlas._defineProps()

            expect(Atlas.version).toEqual('2.0.0')
            expect(Atlas.DS).toEqual(TestLib.path.sep)
            expect(Atlas.projectDir).toEqual(process.cwd())
            expect(Atlas.atlasDir).toEqual(__dirname)
        })
    })

    function getModule () {
        if (global.Atlas) {
            delete global.Atlas.Imports
            delete global.Atlas.Console
            delete global.Atlas
        }

        const Atlas = TestLib.getModule('./index')

        TestLib.Imports.define('./Server', { start: () => {}, })

        return Atlas
    }
})