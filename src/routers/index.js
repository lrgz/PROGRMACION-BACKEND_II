const express = require('express')
const ProductRouter = require('./products')
const CartRouter = require('./carts')
const viewsRouter = require('./views')
const SessionsRouter = require('./sessions')

const productRouter = new ProductRouter()
const cartRouter = new CartRouter()
//const viewRouter = new viewsRouter()
const sessionsRouter = new SessionsRouter()

const mainRouter = express.Router()

mainRouter.use('/api/products', productRouter.getRouter())
mainRouter.use('/api/carts', cartRouter.getRouter())
mainRouter.use('/api/sessions', sessionsRouter.getRouter())
mainRouter.use('/', viewsRouter)
mainRouter.use('*', (req, res, next) => {
    res.status(404).send({status: "error", error: 'Requested path not found',});
})

module.exports = mainRouter