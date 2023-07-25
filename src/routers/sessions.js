const passport = require('passport')
const RouterClass = require('./routeClass')
const userController = require('../controller/usersController')

const authenticateJWT = passport.authenticate('current', { session: false });


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
                res.sendServerError(error.message)
            }
        })

        this.post('/login', ['PUBLIC'], async (req, res) => {
            try{
                res.sendSuccess(await userController.login(req, res))
            }catch(error){
                res.sendServerError(error.message)
            }
        })

        this.get('/logout', ['PUBLIC'], async (req, res) => {
            try{
                res.sendSuccess(await userController.logout(req, res))
            }catch(error){
                res.sendServerError(error.message)
            }
        })
    }
}

module.exports = SessionRouter;