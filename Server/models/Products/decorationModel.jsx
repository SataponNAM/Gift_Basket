const mongoose = require('mongoose')

const decorationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        category: {
            type: String,
            require: true,
        },
        type: {
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

module.exports = mongoose.model('Decoration', decorationSchema)