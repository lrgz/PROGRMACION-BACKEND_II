const { MongoSingleton } = require('./mongoSingleton')
const program = require('../utils/commander')
const dotEnv = require('dotenv')
const { logger} = require('./logger')

const { mode } = program.opts()

dotEnv.config({path: './.env'})

dotEnv.config({
    path: mode === 'development' ? './.env.development': './.env.production' 
})

const mongoInstance = async () => {
    try{
        await MongoSingleton.getInstance()
    }catch(err){
        logger.error(err);
    }
}

module.exports = { mongoInstance, environment: mode }


