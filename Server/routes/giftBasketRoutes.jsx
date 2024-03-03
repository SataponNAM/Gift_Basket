const express = require('express')
const router = express.Router()
const giftBasketController = require('../controller/giftBasketController.jsx')
const veriftJWT = require('../middleware/verifyJWT.jsx')

router.use(veriftJWT)

router.route('/')
    .get(giftBasketController.getGiftBasket)
    .post(giftBasketController.addGiftBasket)
    .patch(giftBasketController.updateGiftBasket)
    .delete(giftBasketController.deleteGiftBasket)

module.exports = router
