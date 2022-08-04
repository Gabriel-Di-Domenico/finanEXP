const { DataTypes } = require("sequelize");
const Sequelize = require('sequelize')
const createUsersTable = require("./database/templates/Users-template.js");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
module.exports = class SequelizeService {
    constructor() {
        this.sequelize = new Sequelize('finanEXP-Development', 'root', process.env.DATABASE_PASSWORD, {
            host: 'localhost',
            dialect: 'mysql'
        })
    }
    createTables() {
        this.usersTable = createUsersTable(this, DataTypes)
    }
    async verifyUserByEmail(email) {
        const checkingEmail = await this.usersTable.findAll({
            where: {
                email: email
            }
        })
        return checkingEmail[0]
    }
    async addNewUser(options) {
        const error = { err: false }

        await this.usersTable.create(options).then(() => { }).catch(err => {
            error.err = true
            err.errors[0].message === 'name must be unique'
                ? error.type = 'nameError'
                : error.type = 'emailError'
        })
        return error
    }
    authUser(userByDataBase) {
        const token = jwt.sign({
            name: userByDataBase.name,
            email: userByDataBase.email
        },
            process.env.TOKEN_SECRET,
            {
                expiresIn: 60
            },
        )
        return token

    }
    encryptPassword(password, callback) {
        return bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                callback('', err)
            } else {
                callback(hash)
            }

        })
    }
    decryptPassword(password, userByDataBase, callback) {
        bcrypt.compare(password, userByDataBase.password, (err, result) => {
            if (result) {
                callback(false)
            } else {
                callback(true)
            }
        })
    }
    verifyToken(token) {
        jwt.verify(token, process.env.TOKEN_SECRET)
        const decode = jwt.decode(token, process.env.TOKEN_SECRET)
        return decode
    }

}