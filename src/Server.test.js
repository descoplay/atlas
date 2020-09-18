const Imports = require('./Imports')

describe('Server', () => {
    const TestLib = require('./TestLib')

    describe('start()', () => {
        test('Se esta rodando corretamente', () => {
            const Server = getModule()

            let runDefaultConfigs = false
            let importExpress = false
            let runRouter = false
            let runListen = false

            Server._defaultConfigs = () => runDefaultConfigs = true
            Server._router = () => runRouter = true

            TestLib.Imports.define('express', () => {
                importExpress = true

                return { listen: () => runListen = true, }
            })

            Server.start()

            expect(runDefaultConfigs).toEqual(true)
            expect(importExpress).toEqual(true)
            expect(runRouter).toEqual(true)
            expect(runListen).toEqual(true)
        })
    })

    describe('_router()', () => {
        test('Se roteamento esta detectando diretório corretamente', () => {
            const Server = getModule()

            Atlas.config.Server.routerDir = 'router'
            Atlas.projectDir = process.cwd()

            let projectDirDef
            let routerDirDef

            Imports.define('path', {
                join: (projectDir, routerDir) => {
                    projectDirDef = projectDir
                    routerDirDef = routerDir
                },
            })

            Imports.define('make-dir', () => {})
            Imports.define('fs-plus', { listSync: () => { return [] }, })

            Server._router()

            expect(projectDirDef).toEqual(Atlas.projectDir)
            expect(routerDirDef).toEqual('router')
        })

        test('Se roteamento chamando as rotas corretamente', async () => {
            const Server = getModule()

            Atlas.config.Server.routerDir = 'router'
            Atlas.projectDir = process.cwd()

            let makeDirRun = false
            let fsPlusRun = false
            let routerExpress
            let routerEntity
            const methodDefaults = {}

            Server.Express = { _router: { stack: [], }, }

            const methodTypes = [ 'get', 'put', 'delete', ]

            methodTypes.map(m => {
                Server.Express[m] = () => {
                    methodDefaults[m] = true
                }
            })

            Imports.define('make-dir', () => makeDirRun = true)

            Imports.define('fs-plus', {
                listSync () {
                    fsPlusRun = true

                    return [ 'Test', ]
                },
            })

            Imports.define('Test', ({ Express, entity, }) => {
                routerExpress = Express
                routerEntity = entity
            })

            await Server._router()

            expect(makeDirRun).toEqual(true)
            expect(fsPlusRun).toEqual(true)
            expect(typeof routerExpress.get).toEqual('function')
            expect(routerEntity).toEqual('Test')
            expect(methodDefaults.get && methodDefaults.put && methodDefaults.delete).toEqual(true)
        })
    })

    describe('_defaultConfigs()', () => {
        test('Se no padrão, define configurações adequadas', () => {
            const Server = getModule()

            Server._defaultConfigs()

            expect(Atlas.config.Server).toBeDefined()
            expect(Atlas.config.Server.port).toEqual(3000)
            expect(Atlas.config.Server.routerDir).toEqual('router')
        })
    })

    function getModule () {
        delete global.Atlas

        const Server = TestLib.getModule('./Server')

        Atlas = { config: { Server: {}, }, Imports: TestLib.Imports, }

        return Server
    }
})