const { productService } = require('../service')

class ProductController {
    get = async (req, res) => {
        try{
            let query = {}
            if(req.query.query === undefined){ 
                query = {}
            }else if(req.query.query === 'true'){ 
                query.status = true
            }else if(req.query.query === 'false'){ 
                query.status = false
            }else{ 
                query.category = req.query.query
            }
    
            let sort = null
            if (req.query.sort === "asc") { 
                sort = { price: 1 };
            } else if (req.query.sort === "desc") {
                sort = { price: -1 };
            }
    
            const options = {
                limit: req.query.limit ? parseInt(req.query.limit) : 10,
                page: req.query.page ? parseInt(req.query.page) : 1,
                sort: sort
            }
            
            let prevLink = ''
            let nextLink = ''
    
            const products = await productService.getProducts(query, options)
            const { docs, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage } = products
            hasPrevPage === false ? prevLink = null : prevLink = `/api/products?page=${parseInt(prevPage)}`
            hasNextPage === false ? nextLink = null : nextLink = `/api/products?page=${parseInt(nextPage)}`
            return { products: docs, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage, prevLink, nextLink }
        }catch(error){
            return error
        }
    }

    getById = async (req, res) => {
        try{
            const product = await productService.getProductById(req.params.pid)
            return { product }
        }catch(error){
            return error
        }
    }

    create = async (req, res) => {
        try{
            const product = req.body
            const addedProduct = await productService.addProduct(product)
            return { addedProduct }
        }catch (error){
            return error
        }
    }

    update = async (req, res) => {
        try{
            const product = req.body
            const updatedProduct = await productService.updateProduct(req.params.pid, product)
            return { updatedProduct }
        }catch (error){
            return error
        }
    }

    delete = async (req, res) => {
        try{
            const deletedProduct = await productService.deleteProduct(req.params.pid)
            return { deletedProduct }
        }catch(error){
            return error
        }
    }
}

module.exports = new ProductController()