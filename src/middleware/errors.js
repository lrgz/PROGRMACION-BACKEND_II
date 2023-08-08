const Errors = require('../utils/Errors/appErrors')
function errorHandler(error, req, res, next){
    console.error("Error detected entering the Error Handler");
    console.error(error.cause);
    switch (error.code) {
        case Errors.INVALID_TYPE_ERROR: 
            res.status(400).send({status: "error", error: error.message});
            break;
        default: 
            res.status(500).send({status: "error", error: "Unhandled error!"});
    }
};

module.exports = errorHandler