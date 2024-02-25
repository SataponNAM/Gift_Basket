const mongoose = require('mongoose')

const basketSchema = new mongoose.Schema(
    {
        name: {
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