const { productService } = require('../service')
const CustomError = require('../utils/Errors/errorMessage')
const Errors = require('../utils/Errors/errors')
const { generateProductErrorInfo } = require('../utils/Errors/errorMessage')



class ProductController {
    get = async (req, res) => {
        try{
            let queryPage = ''
            if (req.query.page) {
                queryPage = parseInt(req.query.page);
                if (isNaN(queryPage) || queryPage < 1) {
                    throw new Error('Invalid page number');
                }
            }

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

            if(query.status !== undefined){ // if query.status exists
                hasPrevPage === false ? prevLink = null : prevLink = `/products?page=${parseInt(prevPage)}&limit=${options.limit}&sort=${req.query.sort}&query=${query.status}`
                hasNextPage === false ? nextLink = null : nextLink = `/products?page=${parseInt(nextPage)}&limit=${options.limit}&sort=${req.query.sort}&query=${query.status}`
            }else if(query.category !== undefined){ // if query.category exists
                hasPrevPage === false ? prevLink = null : prevLink = `/products?page=${parseInt(prevPage)}&limit=${options.limit}&sort=${req.query.sort}&query=${query.category}`
                hasNextPage === false ? nextLink = null : nextLink = `/products?page=${parseInt(nextPage)}&limit=${options.limit}&sort=${req.query.sort}&query=${query.category}`
            }else{ // if there isn't query values
                hasPrevPage === false ? prevLink = null : prevLink = `/products?page=${parseInt(prevPage)}&limit=${options.limit}&sort=${req.query.sort}`
                hasNextPage === false ? nextLink = null : nextLink = `/products?page=${parseInt(nextPage)}&limit=${options.limit}&sort=${req.query.sort}`
            }
            return { products: docs, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage, prevLink, nextLink, session: req.user }
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

    create = async (req, res,next) => {
        try{
            const product = req.body

            if(!product.title || !product.price || !product.code || !product.stock){
                CustomError.createError({
                    name: 'Product creation error',
                    cause: generateProductErrorInfo({title: product.title, code: product.code, price: product.price, stock: product.stock}),
                    message: 'Error trying to create a product',
                    code: Errors.INVALID_TYPE_ERROR
                })
            }

            const addedProduct = await productService.addProduct(product)
            return { addedProduct }
        }catch (error){
            next(error)
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