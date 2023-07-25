const { cartService } = require('../service')

class CartController {
    getById = async (req, res) => {
        try{
            const cart = await cartService.getCartById(req.params.cid)
            return { cart }            
        }catch(error){  
            return error
        }
    }

    create = async (req, res) => {
        try{
            const createdCart = await cartService.createCart()
            return { createdCart }
        }catch(error){
            return error            
        }
    }

    addProduct = async (req, res) => {
        try{
            const addedProduct = await cartService.addProductToCart(req.params.cid, req.params.pid)
            return { addedProduct }
        }catch (error){
            return error
        }
    }

    update = async (req, res) => {
        try{
            const { products } = req.body
            const updatedProduct = await cartService.updateCart(req.params.cid, products)
            return { updatedProduct }
        }catch(error){
            return error
        }
    }

    updateQuantity = async (req, res) => {
        try{
            const quantity = req.body.quantity
            const updatedProduct = await cartService.updateQuantity(req.params.cid, req.params.pid, quantity)
            return { updatedProduct }
        }catch(error){
            return error
        }
    }

    deleteProduct = async (req,res) => {
        try{
            const deletedProduct = await cartService.deleteProductFromCart(req.params.cid, req.params.pid)
            return { deletedProduct }
            // res.status(200).send({status: 'succes', payload: await cartService.getCarts()})
        }catch(error){
            return error
            // res.status(400).send({status: 'error', message: error.message})
        }
    }

    deleteAllProducts = async (req,res) => {
        try{
            const deletedProducts = await cartService.deleteAllProductsFromCart(req.params.cid)
            return { deletedProducts }
        }catch(error){
            return error
        }
    }
}

module.exports = new CartController()