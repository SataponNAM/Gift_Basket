const mongoose = require('mongoose')

const cardSchema = new mongoose.Schema(
    {
        color: {
            type: Sttring,
            require: true,
        },
        decoration: {
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