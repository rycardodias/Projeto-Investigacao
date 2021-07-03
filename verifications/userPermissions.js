const Users = require('../models/User')
const jwt = require("jsonwebtoken");
const { permissions } = require('./permissions')

exports.convertToToken = async function (id) {
    const token = jwt.sign({ id: id }, "MySecret")
    return token
}

const verifyPermissionArray = (perm1, perm2) => {
    for (let i = 0; i < perm1.length; i++) {
        for (let j = 0; j < perm2.length; j++) {
            if (perm1[i] === perm2[j]) {
                return true
            }
        }
    }
    return false
}


exports.verifyPermission = async function (token, requiredPermission) {
    try {
        const idToken = jwt.verify(token, "MySecret").id

        const request = await Users.findByPk(idToken)
        if (request.dataValues) {
            return verifyPermissionArray(request.dataValues.permission, requiredPermission)
        }
    } catch {
        return false
    }

}
