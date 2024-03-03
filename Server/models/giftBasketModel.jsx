const mongoose = require('mongoose')

const giftBasketSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'User'
        },
        basket: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'Basket'
        },
        decoration: [{
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'Decoration'
        }],
        product: [{
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'Product'
        }],
        card: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'Card'
        },
        cardText: {
            type: String,
            require: true,
        },
        totalPrice: {
            type: Number,
            require: true,
        }
    }
)

module.exports = mongoose.model('GiftBasket', giftBasketSchema)