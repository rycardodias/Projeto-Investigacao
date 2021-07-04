const express = require('express')
const router = express.Router()
const db = require('../config/database')

const Model = require('../models/AnimalProduct')

const ResponseModel = require('../lib/ResponseModel')
const { error_missing_fields, error_invalid_fields, error_data_not_found, success_row_delete, error_row_delete, success_row_update,
    error_row_update, error_row_create, success_row_create } = require('../lib/ResponseMessages')

    router.get('/', async (req, res) => {
        const response = new ResponseModel()
        try {
            const request = await Model.findAll()
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
            const request = await Model.findByPk(req.params.id)
    
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

router.post('/create', (req, res) => {
    const { product, animal, weight, description } = req.body

    Model.create({
        product: product,
        animal: animal,
        weight: weight,
        description: description
    })
        .then(status => res.json({ data: status }))
        .catch(err => res.send(err))
})


router.put('/update', (req, res) => {
    const { product, animal, weight, description } = req.body

    if (id == undefined || id == "") {
        res.send("Erro! Deve ser indicado um id!")
    }

    const data = {
        product: product,
        animal: animal,
        weight: weight,
        description: description
    }

    Model.update(data,
        {
            where: {
                id: id
            },
        })
        .then(status => res.json({ data: status }))
        .catch(err => console.log(err))
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