//Filen er i sin helhet skrevet/utformet av Pedram Nourian - kandidatnr: 6020
const express = require('express')
const router = express.Router()
const mongoSanitize = require('express-mongo-sanitize')

const {
    getAllTerminals,
    addTerminals,
    updateTerminals,
    deleteTerminals,
    getTerminal,
    getAvailableTerminals,

} = require('../controllers/terminals.controller')

router.use(mongoSanitize())

router.get('/', getAllTerminals)

router.get('/available', getAvailableTerminals)

router.get('/:id', getTerminal)

router.post('/', addTerminals)

router.patch('/:id', updateTerminals)

router.delete('/:id', deleteTerminals)

module.exports = router
