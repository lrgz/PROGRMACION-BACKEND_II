const UserDao = require('../dao/mongo/userMongo')
const CartDao = require('../dao/mongo/cartMongo')
const ProductDao = require('../dao/mongo/productMongo')

const userService = new UserDao()
const cartService = new CartDao()
const productService = new ProductDao()

module.exports = { userService, cartService, productService }
