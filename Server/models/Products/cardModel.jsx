const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        color: {
            type: String,
            require: true,
        },
        decoration: {
            type: String,
            require: true,
        },
        price: {
            type: Number,
            require: true,
        },
        image: {
            type: String,
            require: true,
        },
    }
)

module.exports = mongoose.model('Card', cardSchema)