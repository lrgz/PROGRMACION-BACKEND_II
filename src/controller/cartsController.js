const { cartService, userService, productService, ticketService } = require('../service')
const transport = require('../utils/nodemail')


class CartController {
    getById = async (req, res) => {
        try{
            const cart = await cartService.getCartById(req.params.cid)
            if(!cart){
                throw new Error('No se pudo encontrar un carrito con la ID: ' + req.params.cid)
            }else{
                return { cart }
            }
        }catch(error){  
            throw error
        }
    }


    create = async (req, res) => {
        try{
            const createdCart = await cartService.createCart()
            return { createdCart }
        }catch(error){
            throw error            
        }
    }

    addProduct = async (req, res) => {
        try{
            const product = await productService.getById(req.params.pid)
            
            if(req.user.user.role === 'premium' && req.user.user.email === product.owner){
                res.send({status: 'error', message: "You can't add products to your cart that you own"})
            }
        

            const addedProduct = await cartService.addProductToCart(req.params.cid, req.params.pid)
            return { addedProduct }
        }catch (error){
            throw error
        }
    }

    update = async (req, res) => {
        try{
            const { products } = req.body
            const updatedCart = await cartService.updateCart(req.params.cid, products)
            return { updatedCart }
        }catch(error){
            throw error
        }
    }

    updateQuantity = async (req, res) => {
        try{
            const quantity = req.body.quantity
            const updatedProduct = await cartService.updateQuantity(req.params.cid, req.params.pid, quantity)
            return { updatedProduct }
        }catch(error){
            throw error
        }
    }

    deleteProduct = async (req,res) => {
        try{
            const deletedProduct = await cartService.deleteProductFromCart(req.params.cid, req.params.pid)
            return { deletedProduct }            
        }catch(error){
            throw error            
        }
    }

    deleteAllProducts = async (req,res) => {
        try{
            const deletedProducts = await cartService.deleteAllProductsFromCart(req.params.cid)            
            return { deletedProducts }
        }catch(error){
            throw error
        }
    }

    generatePurchase = async (req, res) => {
        try{
            let ticketToSend = {}
            const cid = req.params.cid
            const cart = await cartService.getById(cid)
            let outOfStock = []

            for(const orderedProduct of cart.products){
                const stock = orderedProduct.product.stock
                const quantity = orderedProduct.quantity
                const pid = orderedProduct.product._id

                if(stock >= quantity){
                    orderedProduct.product.stock -= quantity
                    await productService.update(pid, orderedProduct.product)
                }else{
                    outOfStock.push(orderedProduct)
                }
            }

            const purchasedProducts = cart.products.filter(product => !outOfStock.includes(product))
            if(purchasedProducts.length > 0){
                
                const date = new Date()
                const formattedDate = `${date.getHours()}:${date.getMinutes()}/${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
                    
                
                const timestamp = date.getTime();
                const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                let letters = ''
                for(let i = 0; i < 3; i++){
                    const index = Math.floor(Math.random() * abc.length)
                    letters += abc.charAt(index)
                }
                const code = letters + timestamp
                
                
                const user = await userService.getByCartId(cid)
                const userEmail = user.email

                const ticket = {
                    code: code,
                    purchase_datetime: formattedDate,
                    amount: purchasedProducts.reduce((total, product) => total + (product.quantity * product.product.price), 0),
                    purchaser: userEmail
                }
                
                ticketToSend = await ticketService.create(ticket)

                
                await cartService.update(cid, outOfStock)

                let result = await transport.sendMail({
                    //TODO Cambiar mi correo
                    from: 'Ticket <lrgz.developer@gmail.com>',
                    to: userEmail,
                    subject: 'Ticket',
                    html: `
                    <div>
                        <h1>Ticket: ${ticket.code}</h1>
                        <h2>Price: $${ticket.amount}</h2>
                    </div>
                    `
                })
            }
            
            if(outOfStock.length > 0){
                return {ticket: ticketToSend, outOfStockProducts: outOfStock.map(product => product.product._id)}
            }else{
                return {ticket: ticketToSend}
            }
        }catch(error){
            throw error
        }    
    }
}

module.exports = new CartController()