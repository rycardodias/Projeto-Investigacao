const { DataTypes } = require('sequelize')
const db = require('../config/database')
const Organization = require('./Organization')

const Exploration = db.define('Exploration', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "type field is required",
            }
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "name field is required",
            }
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "address field is required",
            }
        }
    },
    locale: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "locale field is required",
            }
        }
    },
    zipcode: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "zipcode field is required",
            }
        }
    },
    telephone: {
        type: DataTypes.INTEGER,
    },
    mobilePhone: {
        type: DataTypes.INTEGER,
    },
    fiscalNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "fiscalNumber field is required",
            }
        },
        unique: true
    },
    gpsLocalization: {
        type: DataTypes.STRING,
    },
},
)

Exploration.belongsTo(Organization, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
})
Organization.hasMany(Exploration)

module.exports = Exploration