function startRotes(app, sequelizeService) {
    function cors() {
        const cors = require("cors");
        const corsOptions = {
            origin: [`http://localhost:4200`],
            credentials: true,
            optionSuccessStatus: 200,
        }
        app.use(cors(corsOptions))
    }
    cors()

    app.get(`/users`, async(req, res) => {
        const users = await sequelizeService.getUsers()
        console.log(users)
        res.json(users)

    })
    app.post(`/users/add`, (req, res) => {
        console.log(req)
        sequelizeService.addNewUser(req.body)
    })

}
module.exports = startRotes