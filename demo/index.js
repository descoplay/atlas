const Atlas = require('@desco/atlas')

const config = {
    Console: {
        notLog: false,
    },
}
Atlas.start(config).then(Atlas => {
    Atlas.Console.log('Instancia do atlas retornada pela promessa:')
    Atlas.Console.log(Atlas)
    Atlas.Console.log('Global Atlas')
    Atlas.Console.log(global.Atlas)
})