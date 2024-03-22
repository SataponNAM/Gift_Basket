const express = require('express')
const router = express.Router()
const orderController = require('../controller/orderController.jsx')

const veriftJWT = require('../middleware/verifyJWT.jsx')

router.use(veriftJWT)

router.route('/checkout')
    .post(orderController.checkout)

router.route('/getOrderId')
    .get(orderController.getOrderId)

router.route('/getOrder')
    .get(orderController.getOrder)

router.route('/updateDeliver')
    .patch(orderController.updateDeliver)

module.exports = router