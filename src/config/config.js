const mongoose = require('mongoose')

let url = process.env.DB_MONGO

module.exports = {
    connectDB: () => {
        mongoose.connect(url)
        console.log("Connected a el motor de datos");
    }
}



