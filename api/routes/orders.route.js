//Filen er i sin helhet skrevet/utformet av Pedram Nourian - kandidatnr: 6020
const express = require('express')
const router = express.Router()
const mongoSanitize = require('express-mongo-sanitize')
const {
    getAllOrders,
    getOrderByID,
    addOrder,
    updateOrder,
    deleteOrder,
    getOrderByLocation 
}
 = require('../controllers/orders.controller')

router.use(mongoSanitize())

router.get('/', getAllOrders)

router.get('/:id', getOrderByID)

router.post('/', addOrder)

router.patch('/:id', updateOrder)

router.delete('/:id', deleteOrder)



module.exports = router

