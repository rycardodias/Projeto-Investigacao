const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/database');

const EggsBatch = db.define('EggsBatch', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    name: {
        type: DataTypes.STRING,
    },
},
)

// EggsBatch.sync({ force: true })
module.exports = EggsBatch