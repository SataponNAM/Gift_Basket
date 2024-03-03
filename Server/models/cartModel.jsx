const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema(
    {
        giftBasket: [{
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'GiftBasket'
        }],
        user: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'User'
        },
    }
)

module.exports = mongoose.model('Cart', cartSchema)