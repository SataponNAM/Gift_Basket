const mongoose = require('mongoose')

const addressSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    firstname: {
        type: String,
        require: true,
    },
    lastname: {
        type: String,
        require: true,
    },
    address: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true,
      },
    state: {
        type: String,
        require: true,
    },
    country: {
        type: String,
        require: true,
    },
    postal: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        required: true
    },
    isDefault: {
        type: Boolean,
        require: true,
    },
})

module.exports = mongoose.model('Address', addressSchema)