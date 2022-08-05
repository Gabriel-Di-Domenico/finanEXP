const dotenv = require('dotenv')
dotenv.config()

const express = require('express')

const startRotes = require('./rotes/index.js')
const SequelizeService = require('./sequelize.service.js')

const app = express()
const port = process.env.DATABASE_SERVER_PORT
const sequelizeService = new SequelizeService()

let server = app.listen(port, () => {
    const sequelize = sequelizeService.sequelize
    sequelize.authenticate().then(() => {
        sequelizeService.createTables()
        startRotes(app,sequelizeService)
    }).catch((err) => {
        console.log(`Error in authenticate database. ERROR : ${err}`)
    })
    console.log(`Server online, at address: "http://localhost:${port}`)
})