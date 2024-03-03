const express = require('express')
const router = express.Router()
const basketController = require('../controller/ProductsController/basketController.jsx')
const veriftJWT = require('../middleware/verifyJWT.jsx')

router.use(veriftJWT)

router.route('/')
    .get(basketController.getBasket)
    .post(basketController.addBasket)
    .patch(basketController.updateBasket)
    .delete(basketController.deleteBasket)

module.exports = router