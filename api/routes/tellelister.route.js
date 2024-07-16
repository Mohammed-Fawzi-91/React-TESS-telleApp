const express = require('express')
const router = express.Router()

const getTellelister = require('../controllers/tellelister.controller')

router.get('/', getTellelister)

module.exports = router