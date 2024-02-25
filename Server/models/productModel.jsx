const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true
        },
        type: {
            type: String,
            require: true
        },
        price: {
            type: Float64Array,
            require: true
        },
        image: {
            
        }
    }
)