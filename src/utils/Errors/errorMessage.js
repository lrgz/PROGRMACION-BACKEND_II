exports.generateUserErrorInfo = (user) => {
    return `One or more properties were incomplete or not valid.
        List of required properties:
        * first_name: needs to be a String received, ${user.first_name}
        * last_name: needs to be a String, received, ${user.last_name}
        * email: needs to be a String, received, ${user.email}`
}

exports.generateProductErrorInfo = (product) => {
    return `One or more properties were incomplete or not valid.
        List of required properties:
        * code: needs to be a String received, ${product.code}
        * title: needs to be a String received, ${product.title}
        * price: needs to be a String received, ${product.price}
        * stock: needs to be a String received, ${product.stock}`
}