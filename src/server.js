/**
 * SECCION IMPORT
 */
const express = require('express')
const handlebars = require('express-handlebars')
const { Server } = require('socket.io')
const productRouter = require('./routers/products')
const cartRouter = require('./routers/carts')
const viewsRouter = require('./routers/views')
const sessionsRouter = require('./routers/sessions')

const socketProduct = require('./utils/socketProducts')
const socketChat = require('./utils/socketChat')

const objectConfig = require('./config/config')

const cookieParser = require('cookie-parser')
const session = require('express-session')
const mongoStore = require('connect-mongo') 

const passport = require('passport')
const { initPassport, initPassportGithub } = require('./config/passport')


/**
 * DEFINO PUERTO DE LA APP
 */
const PORT = 8080

/**
 * CONFIGURO LA APP
 */
const app = express()
objectConfig.connectDB()

/*** 
* ARRANQUE APLICACION
*/
const severHttp = app.listen(PORT, () => {
    console.log('Server running on port: ' + PORT )
})


/***
 * SOCKET
 */
const ioSocket = new Server(severHttp)

app.set('views', __dirname+'/views')

const handlebarsConfig = handlebars.create({
    runtimeOptions:{
        allowProtoPropertiesByDefault: true
    }
})

app.engine('handlebars', handlebarsConfig.engine)
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/static', express.static(__dirname+'/public'))
app.use(cookieParser())

app.use(session({
    store: mongoStore.create({                   
        mongoUrl: 'mongodb+srv://userTest:ctrPdIc7sTCimSvx@ecommerce.zaf9sgy.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl: 3600,
    }),
    secret: 'pwd123',
    resave: true,
    saveUninitialized: true
}))



initPassport()
initPassportGithub()
app.use(passport.initialize())
app.use(passport.session())


/**
 * CONFIGURO LA RUTAS
 */

app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)
app.use('/api/sessions', sessionsRouter)
app.use('/', viewsRouter)


app.use("*", (req, res) => {
    res.status(404).send({status: "Error", message: `Requested path not found`,});
});




socketProduct(ioSocket)
socketChat(ioSocket)