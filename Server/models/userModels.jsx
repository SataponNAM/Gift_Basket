const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            require: true,
        },
        lastname: {
            type: String,
            require: true,
        },
        email: {
            type: String,
			required: true,
			unique: true,
        },
        password: {
            type: String,
			required: true,
        },
        roles: [{
			type: String,
			required: true,
			default: "Customer",
		}],
    }
)

module.exports = mongoose.model('User', userSchema)