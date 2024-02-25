const mongoose = require('mongoose')

const decorationSchema = new mongoose.Schema(
    {
        name: {
            type: Sttring,
            require: true,
        },
        category: {
            type: Sttring,
            require: true,
        },
        type: {
            type: Sttring,
            require: true,
        },
        price: {
            type: number,
            require: true,
        },
        image: {
            type: String,
            require: true,
        },
    }
)