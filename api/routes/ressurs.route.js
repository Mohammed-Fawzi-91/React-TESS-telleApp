const express = require('express')
const router = express.Router()

const ressurser = require('../controllers/ressurs.controller')

router.get('/', ressurser)

module.exports = router