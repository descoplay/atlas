module.exports = ({ Express, entity, }) => {
    Express.get(`/${entity}/teste`, (req, res) => {
        res.end('funciona!')
    })
}