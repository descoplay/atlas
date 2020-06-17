const Atlas = require('../src/index')

const config = {
    Console: {
        notLog: false,
    },
}
Atlas.start(config).then(Atlas => {
    console.log(Atlas)
})