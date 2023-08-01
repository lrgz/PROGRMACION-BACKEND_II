class UserDto{
    constructor(user){
        this.first_name = user.first_name
        this.last_name = user.last_name
        this.date_of_birth = user.date_of_birth
        this.email = user.email
        this.password = user.password
        this.cart = user.cart
        this.role = user.role
    }
}

module.exports = UserDto