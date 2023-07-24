const mongoose = require('mongoose')

let url = "mongodb+srv://userTest:ctrPdIc7sTCimSvx@ecommerce.zaf9sgy.mongodb.net/?retryWrites=true&w=majority"

module.exports = {
    connectDB: () => {
        mongoose.connect(url)
        console.log("Connected a el motor de datos");
    }
}



