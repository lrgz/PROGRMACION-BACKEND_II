const fs = require('fs').promises

class ProductManagerFile {
    constructor() {        
        this.filename = '../../storage/products.json'
        this.initializeFile();
    }

    async initializeFile() {
        try {
            await fs.access(this.filename);
        } catch (error) {
            await fs.writeFile(this.filename, '[]');
        }
    }

    async getProducts(query, options) {
        try {
            const data = await fs.readFile(this.filename, 'utf8');
            const products = JSON.parse(data);
            return products;
        } catch (error) {
            throw new Error('Error reading products file:', error);
        }
    }

    async getProductById(pid) {
        try {
            const data = await fs.readFile(this.filename, 'utf8');
            const products = JSON.parse(data);
            return products.find(product => product.id === pid);
        } catch (error) {
            throw new Error('Error reading products file:', error);
        }
    }

    async addProduct(product) {
        try {
            const data = await fs.readFile(this.filename, 'utf8');
            const products = JSON.parse(data);

            const isRepeated = products.some(productSaved => productSaved.code === product.code);
            if (isRepeated) {
                throw new Error("Duplicate product code");
            }

            if (!isRepeated && product.title && product.description && product.code && product.price && product.stock && product.category) {
                products.push({
                    id: products.length + 1,
                    title: product.title,
                    description: product.description,
                    code: product.code,
                    price: product.price,
                    status: product.status === false ? false : true,
                    stock: product.stock,
                    category: product.category,
                    thumbnails: product.thumbnails == null ? [] : product.thumbnails
                });

                await fs.writeFile(this.filename, JSON.stringify(products));
            } else {
                throw new Error("Need to add some features to add this");
            }
        } catch (error) {
            throw new Error('Error adding product:', error);
        }
    }
    async updateProduct(pid, updatedProduct) {
        try {
            const data = await fs.readFile(this.filename, 'utf8');
            const products = JSON.parse(data);
            const productToUpdate = products.find(product => product.id === pid);

            if (productToUpdate) {
                const isRepeated = products.some(productSaved => productSaved.code === updatedProduct.code);
                if (!isRepeated) {
                    const updatedProducts = products.map(product => {
                        if (product.id === pid) {
                            return { ...product, ...updatedProduct };
                        }
                        return product;
                    });

                    await fs.writeFile(this.filename, JSON.stringify(updatedProducts));
                } else {
                    throw new Error("There is already a product with the code: " + updatedProduct.code);
                }
            } else {
                throw new Error("There is no product with the id: " + pid);
            }
        } catch (error) {
            throw new Error('Error updating product:', error);
        }
    }
    async deleteProduct(pid) {
        try {
            const data = await fs.readFile(this.filename, 'utf8');
            const products = JSON.parse(data);
            const productToDelete = products.find(product => product.id === pid);

            if (productToDelete) {
                const updatedProducts = products.filter(product => product.id !== pid);
                await fs.writeFile(this.filename, JSON.stringify(updatedProducts));
            } else {
                throw new Error("There is no product with the id: " + pid);
            }
        } catch (error) {
            throw new Error('Error deleting product:', error);
        }
    }
}

module.exports = ProductManagerFile;