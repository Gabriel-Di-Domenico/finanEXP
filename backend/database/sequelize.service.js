import Sequelize, { DataTypes } from "sequelize";
import createUsersTable from "./templates/Users-template.js";

export default class SequelizeService {
    constructor() {
        this.sequelize = new Sequelize('finanEXP-Development', 'root', process.env.DATABASE_PASSWORD, {
            host: 'localhost',
            dialect: 'mysql'
        })
    }
    createTables() {
        createUsersTable(this, DataTypes)
    }
}