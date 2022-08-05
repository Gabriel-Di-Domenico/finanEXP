const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { DataTypes, Op } = require("sequelize");
const Sequelize = require('sequelize')

module.exports = class SequelizeService {
    constructor() {
        this.sequelize = new Sequelize('finanEXP-Development', 'root', process.env.DATABASE_PASSWORD, {
            host: 'localhost',
            dialect: 'mysql'
        })
    }
    createTables() {
        const createUsersTable = require("./database/templates/Users-template.js");
        this.usersTable = createUsersTable(this, DataTypes)
    }
    async verifyUser(email, name = false) {
        let checkingUser
        if (name) {
            checkingUser = await this.usersTable.findAll({
                where: {
                    [Op.or]: [
                        { email: email },
                        { name: name }
                    ]
                }
            })
        } else {
            checkingUser = await this.usersTable.findAll({
                where: {
                    email: email
                }
            })
        }
        return checkingUser[0]
    }
    async addNewUser(options) {
        const error = { status: false }

        await this.usersTable.create(options).then(() => { }).catch(err => {
            error.status = true
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
    verifyToken(token, callback) {
        jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
            if (err) {
                callback(true)
            } else {
                callback(false, decoded)
            }
        })
    }

}