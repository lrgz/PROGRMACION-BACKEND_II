class ProductDto{
    constructor(product){
        this.title = product.title
        this.description = product.description
        this.thumbnails = product.thumbnails
        this.category = product.category
        this.price = product.price
        this.stock = product.stock
        this.code = product.code
        this.status = product.status
    }
}

module.exports = ProductDto