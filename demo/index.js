const Atlas = require('../src/index')

const config = {
    Console: {
        notLog: false,
    },
}
Atlas.start(config).then(Atlas => {
    Atlas.Console.success('Esta é uma de sucesso')
    Atlas.Console.warning('Esta é uma mensagem com atenção')
    Atlas.Console.error('Esta é uma mensagem de erro')
})