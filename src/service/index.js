const { UserDao, ProductDao, CartDao ,TicketDao} = require('../dao/factory')
const UserRepository = require('../repository/userRepository')
const ProductRepository = require('../repository/productRepository')
const CartRepository = require('../repository/cartRepository')
const TicketRepository = require('../repository/ticketRepository')


const userService = new UserRepository(UserDao)
const productService = new ProductRepository(ProductDao)
const cartService = new CartRepository(CartDao)
const ticketService = new TicketRepository(TicketDao)

module.exports = { userService, cartService, productService ,ticketService}