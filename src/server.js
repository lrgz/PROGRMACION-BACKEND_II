/**
 * SECCION IMPORT
 */
const express = require('express')
const objectConfig = require('./config/config')
const { addLogger, logger } = require('./config/logger')

const handlebars = require('express-handlebars')
const { Server } = require('socket.io')


const mainRouter = require('./routers/index')

const socketProduct = require('./utils/socketProducts')
const socketChat = require('./utils/socketChat')


const cookieParser = require('cookie-parser')


const passport = require('passport')
const { initPassport, initPassportGithub } = require('./config/passport')
const cookieParser = require('cookie-parser')


/**
 * DEFINO PUERTO DE LA APP
 */
const PORT =  process.env.PORT

/**
 * CONFIGURO LA APP
 */
const app = express()
app.use(addLogger)
objectConfig.mongoInstance()

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



initPassport()
initPassportGithub()

app.use(passport.initialize())
app.use(passport.session())


/**
 * CONFIGURO LA RUTAS
 */

app.use(mainRouter)


app.use("*", (req, res) => {
    res.status(404).send({status: "Error", message: `Requested path not found`,});
});




socketProduct(ioSocket)
socketChat(ioSocket)