const RouterClass = require('./routeClass')
const cartController = require('../controller/cartsController')

class CartRouter extends RouterClass {
    init(){
        this.get('/:cid', ['PUBLIC'], async (req, res) => {
            try{
                const payload = await cartController.getById(req, res)
                res.sendSuccess(payload)
            }catch(error){
                res.sendServerError(error.message)
            }
        })

        this.post('/', ['PUBLIC'], async (req, res) => {
            try{
                res.sendSuccess(await cartController.create(req, res))
            }catch(error){
                res.sendServerError(error.message)
            }
        })

        this.post('/:cid/products/:pid', ['USER'], async (req, res) => {
            try{
                res.sendSuccess(await cartController.addProduct(req, res))
            }catch(error){
                res.sendServerError(error.message)
            }
        })

        this.put('/:cid', ['PUBLIC'], async (req, res) => {
            try{
                res.sendSuccess(await cartController.update(req, res))
            }catch(error){
                res.sendServerError(error.message)
            }
        })

        this.put('/:cid/products/:pid', ['PUBLIC'], async (req, res) => {
            try{
                res.sendSuccess(await cartController.updateQuantity(req, res))
            }catch(error){
                res.sendServerError(error.message)
            }
        })

        this.delete('/:cid/products/:pid', ['PUBLIC'], async (req, res) => {
            try{
                res.sendSuccess(await cartController.deleteProduct(req, res))
            }catch(error){
                res.sendServerError(error.message)
            }
        })

        
        this.delete('/:cid', ['PUBLIC'], async (req, res) => {
            try{
                res.sendSuccess(await cartController.deleteAllProducts(req, res))
            }catch(error){
                res.sendServerError(error.message)
            }
        })

        this.get('/:cid/purchase', ['PUBLIC'], async (req, res) => {
            try{
                res.sendSuccess(await cartController.generatePurchase(req, res))
            }catch(error){
                res.sendServerError(error.message)
            }
        })

    }   
}

module.exports = CartRouter;