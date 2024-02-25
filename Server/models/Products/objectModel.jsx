const mongoose = require('mongoose')

const objectSchema = new mongoose.Schema(
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