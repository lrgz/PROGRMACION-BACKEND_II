const { MongoSingleton } = require('./mongoSingleton')

const mongoInstance = async () => {
    try{
        await MongoSingleton.getInstance()
    }catch(err){
        console.log(err);
    }
}

module.exports = { mongoInstance }


