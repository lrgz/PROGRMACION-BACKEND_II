const express = require('express')
const ProductManager = require('../dao/mongo/productMongo') 
const productManager = new ProductManager()
const cartManager = require('../dao/mongo/cartMongo') 
const { authToken } = require('../utils/jwt')


const router = express.Router()

router.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts', {})
})

router.get('/chat', (req,res) => {
    res.render('chat', {})
})

router.get('/products', authToken, async (req, res) => {
    try{
        let user = ''
        if(req.user){
            user = req.user
        }else{
            res.redirect('/login')
        }

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

        const products = await productManager.getProducts(query, options)
        const { docs, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage } = products
        
        let prevLink = ""
        let nextLink = ""

        if(query.status !== undefined){ 
            hasPrevPage === false ? prevLink = null : prevLink = `/products?page=${parseInt(prevPage)}&limit=${options.limit}&sort=${req.query.sort}&query=${query.status}`
            hasNextPage === false ? nextLink = null : nextLink = `/products?page=${parseInt(nextPage)}&limit=${options.limit}&sort=${req.query.sort}&query=${query.status}`
        }else if(query.category !== undefined){ 
            hasPrevPage === false ? prevLink = null : prevLink = `/products?page=${parseInt(prevPage)}&limit=${options.limit}&sort=${req.query.sort}&query=${query.category}`
            hasNextPage === false ? nextLink = null : nextLink = `/products?page=${parseInt(nextPage)}&limit=${options.limit}&sort=${req.query.sort}&query=${query.category}`
        }else{ 
            hasPrevPage === false ? prevLink = null : prevLink = `/products?page=${parseInt(prevPage)}&limit=${options.limit}&sort=${req.query.sort}`
            hasNextPage === false ? nextLink = null : nextLink = `/products?page=${parseInt(nextPage)}&limit=${options.limit}&sort=${req.query.sort}`
        }
        res.render('products', {status: 'succes', payload: docs, totalPages, prevPage, nextPage, page, hasPrevPage, hasNextPage, prevLink, nextLink, session: user })
    }catch(error){
        res.render('products', {status: 'error', message: error.message})
    }
})

router.get('/cart/:cid', authToken, async(req,res) => {
    res.render('cart', {status: 'succes', payload: await cartManager.getCartById(req.params.cid)})
})

router.get('/login', async(req, res) => {
    res.render('login', {})
})

router.get('/register', async(req, res) => {
    res.render('register', {})
})

module.exports = router;