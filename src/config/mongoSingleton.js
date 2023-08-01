const mongoose = require('mongoose')

class MongoSingleton {
    static #instance

    constructor(){
        this.#connectMongoDB()
    }

    static getInstance(){
        if(this.#instance){
            console.log('There is already a connection with database');
        }else{
            this.#instance = new MongoSingleton()
        }
        return this.#instance
    }

    #connectMongoDB = async () => {
        try{
            await mongoose.connect(process.env.DB_MONGO)
            console.log('Successfully connected to Database')
        }catch(err){
            console.log('Could not connect to Database: ' + err)
            process.exit()
        }
    }
}

module.exports = { MongoSingleton }