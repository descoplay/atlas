const Atlas = require('../src/index')

const config = {
    Console: {
        notLog: false,
    },
    Server: {
        port: 3001,
    },
    Db: {
        password: '12345678',
        name: 'eudisrafael',
    },
}

Atlas.start(config).then(Atlas => {
    // console.log(Atlas)
})