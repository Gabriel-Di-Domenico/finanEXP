function createUsersTable(sequelizeService, DataTypes) {
    const sequelize = sequelizeService.sequelize
    const users = sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            unique: false,
            allowNull: false
        }
    })
    users.sync({ force: false })
    return users
}
module.exports = createUsersTable