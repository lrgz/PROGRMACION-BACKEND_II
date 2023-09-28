const passport = require('passport')
const RouterClass = require('./routeClass')
const userController = require('../controller/usersController')
const { generateToken } = require('../utils/jwt')
const uploader = require('../utils/multer');

const authenticateJWT = passport.authenticate('current', { session: false });
const authenticateGithub = passport.authenticate('github', { session: false })

class SessionRouter extends RouterClass {
    init(){
        this.get('/', ['ADMIN'], authenticateJWT, async (req, res) => {
            try{
                res.sendSuccess(await userController.getUsers(req, res))
            }catch(error){
                res.sendServerError(error.message)
            }
        })

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

        this.post('/recoverpassword', ['PUBLIC'], async (req, res) => {
            try{
                res.sendSuccess(await userController.recoverPassword(req, res))
            }catch(error){
                res.sendServerError(error.message)
            }
        })

        this.post('/updatepassword', ['PUBLIC'], async (req, res) => {
            try{
                res.sendSuccess(await userController.updatePassword(req, res))
            }catch(error){
                res.sendServerError(error.message)
            }
        })

        this.get('/premium/:uid', ['USER', 'PREMIUM'], async (req, res) => {
            try{
                res.sendSuccess(await userController.premiumUser(req, res))
            }catch(error){
                res.sendServerError(error.message)
            }
        })

        this.post('/:uid/documents', ['USER', 'PREMIUM', 'ADMIN'], uploader.fields([
            { name: 'identification', maxCount: 1},
            { name: 'addressProof', maxCount: 1 },
            { name: 'accountStatement', maxCount: 1 },
            { name: 'profile', maxCount: 1 }
        ]), async (req, res) => {
            try{
                res.sendSuccess(await userController.uploadDocument(req, res))
            }catch(error){
                res.sendServerError(error.message)
            }
        })

        this.delete('/', ['ADMIN'], authenticateJWT, async (req, res) => {
            try{
                res.sendSuccess(await userController.inactiveUsers(req, res))
            }catch(error){
                res.sendServerError(error.message)
            }
        })

        this.get('/github', ['PUBLIC'],authenticateGithub, async (req, res)=>{})
        
        this.get('/githubcallback', ['PUBLIC'], authenticateGithub,  async (req, res) => {
            try{
                const user = req.user
                const token = generateToken(user)
                res.cookie(process.env.JWT_COOKIE_KEY, token, {maxAge: 3600000, httpOnly: false, sameSite: 'none', secure: true})
                res.redirect('/products')
            }catch(error){
                res.sendServerError(error)
            }
        })
    }
}

module.exports = SessionRouter;