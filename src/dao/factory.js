const objectConfig = require('../config/config')


let UserDao, ProductDao, CartDao, TicketDao




switch(process.env.PERSISTENCE){

    case 'MONGO':

        objectConfig.mongoInstance()

        const UserDaoMongo = require('../dao/mongo/userMongo')

        const ProductDaoMongo = require('../dao/mongo/productMongo')

        const CartDaoMongo = require('../dao/mongo/cartMongo')

        const TicketDaoMongo = require('../dao/mongo/ticketMongo')

        UserDao = UserDaoMongo

        ProductDao = ProductDaoMongo

        CartDao = CartDaoMongo

        TicketDao = TicketDaoMongo

    break; 

    case 'FILE':

        const UserDaoFile = require('../dao/filesystem/userFile')

        const ProductDaoFile = require('../dao/filesystem/productFile')

        const CartDaoFile = require('../dao/filesystem/cartFile')


        UserDao = UserDaoFile

        ProductDao = ProductDaoFile

        CartDao = CartDaoFile

        break;

}




module.exports = { UserDao, ProductDao, CartDao , TicketDao}