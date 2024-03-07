const express = require('express')
const router = express.Router()
const cartController = require('../controller/cartController.jsx')
const veriftJWT = require('../middleware/verifyJWT.jsx')

router.use(veriftJWT)

router.route('/')
    .get(cartController.getCart)
    .post(cartController.addCart)
    .patch(cartController.updateCart)
    .delete(cartController.deleteCart)

router.route('/product')
    .delete(cartController.deleteCartProduct)

module.exports = router
