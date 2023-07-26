
/**
 * SECCION IMPORT
 */
const ProductManager = require('../dao/mongo/productMongo') 
const productManager = new ProductManager
/***
 * SECCION DEL SOCKET 
 */
const socketProduct = async (ioSocket) => {

    const products = await productManager.getProducts()
    
    ioSocket.on('connection', socket => {

        socket.emit('products', products)

        socket.on('addProduct', async data => {
            await productManager.addProduct(data)
            const products = await productManager.getProducts()
            socket.emit('products', products)            
        })

        socket.on('deleteProduct', async data => {
            await productManager.deleteProduct(data)
            const products = await productManager.getProducts()
            socket.emit('products', products)            
        })
    })
}

/***
* EXPORTS
*/
module.exports = socketProduct