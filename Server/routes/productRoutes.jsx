const express = require('express')
const router = express.Router()
const productsController = require('../controller/ProductsController/productController.jsx')

const veriftJWT = require('../middleware/verifyJWT.jsx')

router.use(veriftJWT)

router.route('/')
    .get(productsController.getProduct)
    .post(productsController.addProduct)
    .patch(productsController.updateProduct)
    .delete(productsController.deleteProduct)

module.exports = router
