const mongoose = require('mongoose')

const collection = 'carts'

const cartSchema = new mongoose.Schema({
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products'
        },
        quantity: Number
    }]
})

const cartModel = mongoose.model(collection, cartSchema)

module.exports = cartModel