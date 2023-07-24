const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const collection = 'products'

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    thumbnails: Array,
    category: String,
    price: Number,
    stock: Number,
    status: {
        type: Boolean,
        default: true
    },
    code: {
        type: String,
        unique: true,
        required: true,
    }
})

productSchema.plugin(mongoosePaginate)
const productModel = mongoose.model(collection, productSchema)

module.exports = productModel