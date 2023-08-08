const passport = require('passport')
const RouterClass = require('./routeClass')
const userController = require('../controller/usersController')
const { generateToken } = require('../utils/jwt')

const authenticateJWT = passport.authenticate('current', { session: false });
const authenticateGithub = passport.authenticate('github', { session: false })

class SessionRouter extends RouterClass {
    init(){
        this.get('/current', ['PUBLIC'], authenticateJWT,  async (req, res) => {
            
            try{
                res.sendSuccess(await userController.current(req, res))
            }catch(error){
                res.sendServerError(error.message)
            }
        })

        this.post('/register', ['PUBLIC'], async (req, res) => {
            try{
                
                res.sendSuccess(await userController.register(req, res))
            }catch(error){
                res.sendServerError(error)
            }
        })

        this.post('/login', ['PUBLIC'], async (req, res) => {
            try{
                console.log("entrando al endpoint")
                res.sendSuccess(await userController.login(req, res))
            }catch(error){
                
                res.sendServerError(error)
            }
        })

        this.get('/logout', ['PUBLIC'], async (req, res) => {
            try{
                res.sendSuccess(await userController.logout(req, res))
            }catch(error){
                res.sendServerError(error)
            }
        })

        this.get('/github', ['PUBLIC'],authenticateGithub, async (req, res)=>{})
        
        this.get('/githubcallback', ['PUBLIC'], authenticateGithub,  async (req, res) => {
            try{
                const user = req.user
                const token = generateToken(user)
                res.cookie(process.env.JWT_COOKIE_KEY, token, {maxAge: 3600000, httpOnly: true})
                res.redirect('/products')
            }catch(error){
                res.sendServerError(error)
            }
        })
    }
}

module.exports = SessionRouter;