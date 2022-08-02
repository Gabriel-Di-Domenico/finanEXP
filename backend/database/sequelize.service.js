const { DataTypes } = require("sequelize");
const Sequelize = require('sequelize')
const createUsersTable = require("./templates/Users-template.js");

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
    async getUsers() {
        const users = await this.usersTable.findAll()
        console.log(users)
    }
}