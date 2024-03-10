const express = require('express')
const router = express.Router()
const orderController = require('../controller/orderController.jsx')

const veriftJWT = require('../middleware/verifyJWT.jsx')

router.use(veriftJWT)

router.route('/checkout')
    .post(orderController.checkout)

router.route('getOrderId')
    .get(orderController.getOrderId)

module.exports = router