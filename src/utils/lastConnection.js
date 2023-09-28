const userModel = require('../dao/mongo/models/userModel')

const lastConnection = async (userId) => {
    const connection = await userModel.findByIdAndUpdate(userId, { last_connection: new Date() })
}

module.exports = lastConnection