const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            require: 'true',
            ref: 'User'
        },
        product: [{
            type: mongoose.Schema.Types.ObjectId,
            require: 'true',
            ref: 'GiftBasket'
        }],
        totalPrice: {
            type: Number,
            require: true,
            default: 0,
        },
        address: {
            type: mongoose.Schema.Types.ObjectId,
            require: 'true',
            ref: 'Address'
        },
        status: {
            type: String,
            require: true
        },
        idDeliver: {
            type: Boolean,
            require: true,
            default: false
        },
        session_id: {
            type: String,
            require: true
        },
        created: {
            type: Date,
            default: Date.now
        },
    }
)

module.exports = mongoose.model('Order', orderSchema)