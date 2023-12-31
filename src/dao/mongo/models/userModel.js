const mongoose = require('mongoose')

const collection = 'users'

const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    date_of_birth: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts'
    },    
    rol: {
        type: String,
        enum: ['admin', 'user', 'premium'],
        default:"user"
    },
    documents: [{
        name: {
            type: String,
        },
        reference: {
            type: String,
        }
    }],
    last_connection: {
        type: Date,
        default: new Date()
    }
})

const userModel = mongoose.model(collection, userSchema)

module.exports = userModel