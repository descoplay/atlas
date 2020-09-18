describe('Console', () => {
    const TestLib = require('./TestLib')

    describe('log()', () => {
        test('Se com clear: true esta chamando a limeza de tela', () => {
            const Console = getModule()

            let run = false

            TestLib.Imports.define('clear', () => run = true)
            TestLib.Imports.defineConsole('log', () => {})

            Console.log('', { clear: true, })

            expect(run).toEqual(true)
        })

        test('Se esta imprimindo a mensagem desejada', () => {
            const Console = getModule()

            let msg = ''

            TestLib.Imports.defineConsole('log', (_params, _txt) => msg = _txt)

            Console.log('escreveu')

            expect(msg).toEqual('escreveu')
        })

        test('Se com breakLine: true esta quebrando linha', () => {
            const Console = getModule()

            const msg = []

            TestLib.Imports.defineConsole('log', (_params, _txt) => msg.push(_txt))

            Console.log('-', { breakLine: true, })

            expect(msg[1]).toEqual('')
        })

        test('Se ao receber cor de fonte, usa a cor', () => {
            const Console = getModule()

            let params

            TestLib.Imports.defineConsole('log', (_params, _txt) => params = _params)

            Console.log('', { color: 'Red', })

            expect(params).toEqual('\x1b[31m')
        })

        test('Se ao receber cor de fundo, usa a cor de fundo', () => {
            const Console = getModule()

            let params

            TestLib.Imports.defineConsole('log', (_params, _txt) => params = _params)

            Console.log('', { fgColor: 'Red', })

            expect(params).toEqual('\x1b[41m')
        })

        test('Se underscore: true,, usa o sublinhado', () => {
            const Console = getModule()

            let params

            TestLib.Imports.defineConsole('log', (_params, _txt) => params = _params)

            Console.log('', { underscore: true, })

            expect(params).toEqual('\x1b[4m')
        })

        test('Se bright: true, usa o brilho', () => {
            const Console = getModule()

            let params

            TestLib.Imports.defineConsole('log', (_params, _txt) => params = _params)

            Console.log('', { bright: true, })

            expect(params).toEqual('\x1b[1m')
        })

        test('Se ao passar todas as formatações true, usa-as', () => {
            const Console = getModule()

            let params

            TestLib.Imports.defineConsole('log', (_params, _txt) => params = _params)

            Console.log('', {
                fgColor: 'Red',
                color: 'Red',
                underscore: true,
                bright: true,
            })

            expect(params).toEqual('\x1b[31m\x1b[41m\x1b[4m\x1b[1m')
        })
    })

    describe('header()', () => {
        test('Se escreve corretamente o cabeçalho', () => {
            const Console = getModule()

            Atlas.version = '2.0.0'

            let msg
            let params

            Console.log = (_msg, _params = {}) => {
                msg = _msg
                params = _params
            }

            Console.header()

            expect(msg).toEqual('Atlas v2.0.0')
            expect(params.clear).toEqual(true)
            expect(params.breakLine).toEqual(true)
            expect(params.underscore).toEqual(true)
            expect(params.bright).toEqual(true)
        })
    })

    describe('error()', () => {
        test('Se escreve corretamente o erro', () => {
            const Console = getModule()

            let msg
            let params

            Console.log = (_msg, _params = {}) => {
                msg = _msg
                params = _params
            }

            Console.error('Teste', { fgColor: 'Blue', })

            expect(msg).toEqual('Teste')
            expect(params.color).toEqual('Red')
            expect(params.fgColor).toEqual('Blue')
        })
    })

    describe('warning()', () => {
        test('Se escreve corretamente a atenção', () => {
            const Console = getModule()

            let msg
            let params

            Console.log = (_msg, _params = {}) => {
                msg = _msg
                params = _params
            }

            Console.warning('Teste', { fgColor: 'Blue', })

            expect(msg).toEqual('Teste')
            expect(params.color).toEqual('Yellow')
            expect(params.fgColor).toEqual('Blue')
        })
    })

    describe('success()', () => {
        test('Se escreve corretamente o sucesso', () => {
            const Console = getModule()

            let msg
            let params

            Console.log = (_msg, _params = {}) => {
                msg = _msg
                params = _params
            }

            Console.success('Teste', { fgColor: 'Blue', })

            expect(msg).toEqual('Teste')
            expect(params.color).toEqual('Green')
            expect(params.fgColor).toEqual('Blue')
        })
    })

    function getModule () {
        delete global.Atlas

        const Console = TestLib.getModule('./Console')

        Atlas = { config: {}, Imports: TestLib.Imports, }

        return Console
    }
})