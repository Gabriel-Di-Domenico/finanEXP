function startRotes(app, sequelizeService) {
    

    app.get(`/users`, (req, res) => {
        const users = sequelizeService.getUsers()
        res.json(users)

    })
    app.post(`/users/add`, (req, res) => {
        console.log(req.body)
    })

}
module.exports = startRotes