const { DataTypes, Sequelize } = require('sequelize')
const db = require('../config/database')
const ExplorationType = require('./ExplorationType')
const Organization = require('./Organization')

const Exploration = db.define('Exploration', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },  
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    locale: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    zipcode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    mobilePhone: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    fiscalNumber: {
        type: DataTypes.INTEGER,
        allowNull: true,
        unique: true
    },
    gpsLocalization: {
        type: DataTypes.STRING,
        allowNull: true
    },
    OrganizationId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: Organization,
            key: 'id'
        }
    },
    ExplorationTypeId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
            model: ExplorationType,
            key: 'id'
        }
    }
},
)

Exploration.belongsTo(Organization)
Organization.hasMany(Exploration)

Exploration.belongsTo(ExplorationType)
ExplorationType.hasMany(Exploration)

// Exploration.sync({ force: true })

// db.query("ALTER TABLE \"Explorations\" DROP CONSTRAINT \"Explorations_ExplorationTypeId_fkey\", " +
//     " ADD CONSTRAINT \"Explorations_ExplorationTypeId_fkey\" FOREIGN KEY(\"ExplorationTypeId\") REFERENCES \"ExplorationTypes\" " +
//     "ON UPDATE NO ACTION;")
//     db.query("ALTER TABLE \"Explorations\" DROP CONSTRAINT \"Explorations_OrganizationId_fkey\", " +
//     " ADD CONSTRAINT \"Explorations_OrganizationId_fkey\" FOREIGN KEY(\"OrganizationId\") REFERENCES \"Organizations\" " +
//     "ON UPDATE NO ACTION;")

module.exports = Exploration