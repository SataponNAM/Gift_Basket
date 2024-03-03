const express = require('express')
const router = express.Router()
const decorationController = require('../controller/ProductsController/decorationController.jsx')
const veriftJWT = require('../middleware/verifyJWT.jsx')

router.use(veriftJWT)

router.route('/')
    .get(decorationController.getDecoration)
    .post(decorationController.addDecoration)
    .patch(decorationController.updateDecoration)
    .delete(decorationController.deleteDecoration)

module.exports = router
