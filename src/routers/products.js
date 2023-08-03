const RouterClass = require('./routeClass')
const productController = require('../controller/productsController')

class ProductRouter extends RouterClass {
    init(){
        this.get('/', ['PUBLIC'], async (req, res) => {
            try{
                res.sendSuccess(await productController.get(req, res))
            }catch(error){
                res.sendServerError(error)
            }
        })

        this.get('/:pid', ['PUBLIC'], async (req, res) => {
            try{
                res.sendSuccess(await productController.getById(req, res))
            }catch(error){
                res.sendServerError(error)
            }
        })

        this.post('/', ['ADMIN'], async (req, res,next) => {
            try{
                res.sendSuccess(await productController.create(req, res))
            }catch(error){
                res.sendServerError(error)
            }
        })

        this.put('/:pid', ['ADMIN'], async (req, res) => {
            try{
                res.sendSuccess(await productController.update(req, res))
            }catch(error){
                res.sendServerError(error)
            }
        })

        this.delete('/:pid', ['ADMIN'], async (req, res) => {
            try{
                res.sendSuccess(await productController.delete(req, res))
            }catch(error){
                res.sendServerError(error)
            }
        })
    }
}

module.exports = ProductRouter;