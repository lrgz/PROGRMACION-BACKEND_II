const userModel = require('./models/userModel')

class UserManagerMongo{
    constructor(model){
        this.userModel = model
    }

    async getUsers(){
        try{
            return await userModel.find({})
        }catch (error) {
            return new Error(error)
        }
    }

    async getUserById(uid) {
        try{
            return await userModel.findById({_id: uid})
        }catch (error) {
            return new Error(error)
        }
    }

    async getUserByEmail(email) {
        try{
            return await userModel.findOne({email: email})
        }catch (error) {
            return new Error(error)
        }
    }

    async getUserByLogin(email, password){
        try{
            console.log("estyo n mondo login")
            return await userModel.findOne({email: email, password: password})
        }catch (error) {
            return new Error(error)
        }
    }

    async getUserByCartId(cid){
        try{
            return await userModel.findOne({cart: cid})
        }catch(error){
            return new Error(error)
        }
    }


    async addUser(user){
        try{            
            return await userModel.create(user)
        }catch (error) {
            return new Error(error)
        }
    }

    async updateUser(uid, user){
        try{
            return await userModel.findOneAndUpdate(uid, data)
        }catch (error) {
            return new Error(error)
        }
    }

    async deleteUser(uid){
        try{
            return await userModel.findOneAndDelete({_id: uid})
        }catch (error) {
            return new Error(error)
        }
    }
}

module.exports = UserManagerMongo