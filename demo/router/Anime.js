module.exports = ({ Express, entity, }) => {
    Express.get(`/${entity}/teste`, (req, res) => {
        res.end('funciona2!')
    })

    Express.put(`/${entity}/teste`, (req, res) => {
        res.end('funciona2!')
    })
}