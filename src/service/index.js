const { UserDao, ProductDao, CartDao ,TicketDao} = require('../dao/factory')
const UserRepository = require('../repository/userRepository')
const ProductRepository = require('../repository/productRepository')
const CartRepository = require('../repository/cartRepository')
const TicketRepository = require('../repository/ticketRepository')


const userService = new UserRepository(new UserDao)
const productService = new ProductRepository(new ProductDao)
const cartService = new CartRepository(new CartDao)
const ticketService = new TicketRepository(new TicketDao)

module.exports = { userService, cartService, productService ,ticketService}