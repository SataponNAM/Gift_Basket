const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {
        cart: {
            type: mongoose.Schema.Types.ObjectId,
            require: true,
            ref: 'Cart',
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            require: 'true',
            ref: 'User'
        },
        total: {
            type: Number,
            require: true,
            default: 0,
        },
        created: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = mongoose.model('Order', orderSchema)