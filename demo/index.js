const Atlas = require('../src/index')

const config = {
    Console: {
        notLog: false,
    },
    Server: {
        port: 3001,
    },
}

Atlas.start(config).then(Atlas => {
    // console.log(Atlas)
})