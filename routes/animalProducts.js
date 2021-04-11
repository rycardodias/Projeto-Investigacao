const express = require('express')
const router = express.Router()
const db = require('../config/database')

const Model = require('../models/AnimalProduct')

router.get('/', (req, res) => {
    Model.findAll()
        .then(status => res.send(status))
        .catch(err => console.log(err))
})

router.get('/id', (req, res) => {
    Model.findByPk(req.headers.id)
        .then(status => res.send(status))
        .catch(err => console.log(err))
})

router.post('/create', (req, res) => {
    const { product, animal, weight, description } = req.body

    Model.create({
        product: product,
        animal: animal,
        weight: weight,
        description: description
    })
        .then(status => res.send(status))
        .catch(err => res.send(err))
})


router.put('/update', (req, res) => {
    const { product, animal, weight, description } = req.body

    if (id == undefined || id == "") {
        res.send("Error! An id must be provided!")
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
        .then(status => res.send(status))
        .catch(err => console.log(err))
})

router.delete('/delete', (req, res) => {
    const { id } = req.body

    Model.destroy({
        where: {
            id: id
        },
    })
        .then(status => res.json(status))
})

module.exports = router