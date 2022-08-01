function createUsersTable(sequelizeService, DataTypes) {
    const sequelize = sequelizeService.sequelize
    const openedQuotations = sequelize.define('openedQuotations', {
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
    return openedQuotations
}
export default createUsersTable