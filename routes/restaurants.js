const express = require('express')
const router = express.Router()
const db = require('../config/database')

const Model = require('../models/Restaurant')
const User = require('../models/User')

const ResponseModel = require('../lib/ResponseModel')
const { error_missing_fields, error_invalid_fields, error_data_not_found, success_row_delete, error_row_delete, success_row_update,
    error_row_update, error_row_create, success_row_create } = require('../lib/ResponseMessages')

router.get('/', async (req, res) => {
    const response = new ResponseModel()
    try {
        const request = await Model.findAll({ include: User })
        if (request.length > 0) {
            response.data = request
            res.status(200).json(response)
        } else {
            response.error = error_data_not_found
            res.status(404).json(response)
        }
    } catch (error) {
        response.message = error_data_not_found
        response.error = error
        return res.status(400).json(response)
    }

})

router.get('/id/:id', async (req, res) => {
    const response = new ResponseModel()
    try {
        if (!req.params.id) {
            response.error = error_missing_fields
            res.status(400).json(response)
        }
        const request = await Model.findByPk(req.params.id, { include: User })

        if (request) {
            response.data = request
            res.status(200).json(response)
        } else {
            response.error = error_data_not_found
            res.status(404).json(response)
        }
    } catch (error) {
        response.message = error_invalid_fields
        response.error = error
        return res.status(400).json(response)
    }

})

router.post('/create', async (req, res) => {
    const response = new ResponseModel()
    try {
        const { UserId, name, description, address, locale, zipcode, fiscalNumber, telephone, mobilePhone } = req.body


        if (!(UserId && name && description && address && locale && zipcode && fiscalNumber)) {
            response.error = error_missing_fields
            return res.status(400).json(response)
        }

        const data = {
            UserId: UserId,
            name: name,
            description: description,
            address: address,
            locale: locale,
            zipcode: zipcode,
            fiscalNumber: fiscalNumber,
            telephone: telephone,
            mobilePhone: mobilePhone
        }

        const request = await Model.create(data)

        if (request) {
            response.message = success_row_create
            response.data = request
            res.status(200).json(response)
        } else {
            response.error = error_row_create
            res.status(404).json(response)
        }
    } catch (error) {
        response.message = error_invalid_fields
        response.error = error
        return res.status(400).json(response)
    }
})


router.put('/update', async (req, res) => {
    const response = new ResponseModel()
    try {
        const { id, UserId, name, description, address, locale, zipcode, fiscalNumber, telephone, mobilePhone } = req.body

        if (!id) {
            response.error = error_missing_fields
            res.status(400).json(response)
        }

        const data = {
            UserId: UserId,
            name: name,
            description: description,
            address: address,
            locale: locale,
            zipcode: zipcode,
            fiscalNumber: fiscalNumber,
            telephone: telephone,
            mobilePhone: mobilePhone
        }

        const request = await Model.update(data, { where: { id: id } })

        if (request == 1) {
            response.data = success_row_update
            res.status(200).json(response)
        } else {
            response.error = error_row_update
            res.status(404).json(response)
        }
    } catch (error) {
        response.message = error_invalid_fields
        response.error = error
        return res.status(400).json(response)
    }
})


router.delete('/delete', async (req, res) => {
    const response = new ResponseModel()
    try {
        const { id } = req.body
        if (!id) {
            response.error = error_missing_fields
            return res.status(400).json(response)
        }
        const request = await Model.destroy({ where: { id: id } })

        if (request === 1) {
            response.data = success_row_delete
            res.status(200).json(response)
        } else {
            response.error = error_row_delete
            res.status(404).json(response)
        }
    } catch (error) {
        response.message = error_invalid_fields
        response.error = error
        return res.status(400).json(response)
    }
})

module.exports = router