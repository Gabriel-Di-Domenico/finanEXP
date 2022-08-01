import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import SequelizeService from './database/sequelize.service.js'

const app = express()
const port = 51235
const sequelizeService = new SequelizeService()

express.urlencoded({ extended: false })
app.use(express.urlencoded({ extended: false }))

let server = app.listen(port, () => {
    const sequelize = sequelizeService.sequelize
    sequelize.authenticate().then(() => {
        sequelizeService.createTables()
    }).catch((err) => {
        console.log(`Error in authenticate database. ERROR : ${err}`)
    })
    console.log('Server online, port: ' + port)
})