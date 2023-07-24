const express = require('express')
const ProductManager = require('../dao/mongo/productMongo') 
const { authToken } = require('../utils/jwt')
const router = express.Router()




router.get('/', authToken, async (req, res) => {    

    try{
        let query = {}
        if(req.query.query === undefined){ // query undefined
            query = {}
        }else if(req.query.query === 'true'){ // status === true
            query.status = true
        }else if(req.query.query === 'false'){ // status === false
            query.status = false
        }else{ // category === req.query.params
            query.category = req.query.query
        }

        let sort = null
        if (req.query.sort === "asc") { // asc or desc
            sort = { price: 1 };
        } else if (req.query.sort === "desc") {
            sort = { price: -1 };
        }

        const options = {
            limit: req.query.limit ? parseInt(req.query.limit) : 10,
            page: req.query.page ? parseInt(req.query.page) : 1,
            sort: sort
        }
        
        const products = await ProductManager.getProducts(query, options)
        const { docs, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage } = products
        hasPrevPage === false ? prevLink = null : prevLink = `/api/products?page=${parseInt(prevPage)}`
        hasNextPage === false ? nextLink = null : nextLink = `/api/products?page=${parseInt(nextPage)}`

        res.status(200).send({status: 'succes', payload: docs, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage, prevLink, nextLink })
    }catch(error){
        res.status(400).send({status: 'error', message: error.message})
    }

})

router.get('/:id', authToken,async (req, res) => {
    try{        

        const product = await ProductManager.getById(req.params.id)
        res.status(200).send({status: 'succes', payload: product})
    }catch(error){
        res.status(400).send({status: 'error', message: error.message})
    }
})

router.post('/', async (req, res) => {
    try{
        const product = req.body                        
        await ProductManager.addProduct(product)                
        res.status(200).send({status: 'succes', payload: await ProductManager.getProducts()})
    }catch (error){
        res.status(400).send({status: 'error', message: error.message})
    }
})
router.put('/:id', async (req, res) => {
    try{
        const product = req.body
        await ProductManager.updateProduct(req.params.id, product)
        res.status(200).send({status: 'succes', payload: await ProductManager.getProducts()})
    }catch (Error){
        res.status(400).send({status: 'error', message: Error.message})
    }
})
router.delete('/:pid', async (req, res) => {
    try{
        await ProductManager.deleteProduct(Number(req.params.pid))
        res.status(200).send({status: 'succes', payload: await ProductManager.getProducts()})
    }catch(error){
        res.status(400).send({status: 'error', message: error.message})
    }
})

/***
* EXPORTS
*/
module.exports = router;
