const Errors = require('../utils/Errors/appErrors')
const { logger } = require('../config/logger')

function errorHandler(error, req, res, next){
    logger.error("Error detected entering the Error Handler");
    logger.error(error.cause);
    switch (error.code) {
        case EErrors.INVALID_TYPE_ERROR: 
            res.status(400).send({status: "error", error: error.message});
            break;
        default: 
            res.status(500).send({status: "error", error: "Unhandled error!"});
    }
};

module.exports = errorHandler