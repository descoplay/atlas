const Atlas = require('@desco/atlas')

Atlas.start({}).then(Atlas => {
    console.log('Instancia do atlas retornada pela promessa:', Atlas)
    console.log('Global Atlas', global.Atlas)
})