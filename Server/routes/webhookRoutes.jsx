const express = require('express')
const router = express.Router()
const orderController = require('../controller/orderController.jsx')

router.route('/')
    .post(orderController.webhook);

module.exports = router