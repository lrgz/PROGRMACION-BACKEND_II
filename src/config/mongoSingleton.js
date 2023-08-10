const mongoose = require('mongoose')
const { logger}  = require('./logger')

class MongoSingleton {
    static #instance

    constructor(){
        this.#connectMongoDB()
    }

    static getInstance(){
        if(this.#instance){
            logger.info('There is already a connection with database');
        }else{
            this.#instance = new MongoSingleton()
        }
        return this.#instance
    }

    #connectMongoDB = async () => {
        try{
            await mongoose.connect(process.env.DB_MONGO)
            logger.info('Successfully connected to Database')
        }catch(err){
            logger.error('Could not connect to Database: ' + err)
            process.exit()
        }
    }
}

module.exports = { MongoSingleton }