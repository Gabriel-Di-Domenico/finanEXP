const express = require('express')
const startUsersRotes = require('./usersRotes')
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

    app.use(express.json())

    startUsersRotes(app, sequelizeService)

    app.post('/verifyToken', (req, res) => {
        const decode = sequelizeService.verifyToken(req.body.token)
        if (decode) {
            res.status(200).json({ mensage: 'Usuário autorizado !', user: decode })
        }else{
            res.status(401).json({message:'Usuário não autorizado'})
        }
    })

}
module.exports = startRotes