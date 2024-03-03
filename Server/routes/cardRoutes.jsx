const express = require('express')
const router = express.Router()
const cardController = require('../controller/ProductsController/cardController.jsx')
const veriftJWT = require('../middleware/verifyJWT.jsx')

router.use(veriftJWT)

router.route('/')
    .get(cardController.getCard)
    .post(cardController.addCard)
    .patch(cardController.updateCard)
    .delete(cardController.deleteCard)

module.exports = router
