const passport = require('passport')
const userManager = require('../dao/mongo/userMongo')
const GitHubStrategy = require('passport-github2')
const jwtStrategy = require('passport-jwt')

const JWTStrategy = jwtStrategy.Strategy;
const ExtractJWT = jwtStrategy.ExtractJwt;

const cookieExtractor = req => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwtCookieToken'];
    }
    return token;
};


const initPassport = () => {

    const jwtOptions = {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: 'SecretKEY',
    };

    passport.use('current', new JWTStrategy(jwtOptions, async (jwt_payload, done) => {
        try{
            return done(null, jwt_payload.user);
        }catch(error){
            return done(error);
        }
    }))
}

const initPassportGithub = () => {
    passport.use('github', new GitHubStrategy({ 
        clientID: 'Iv1.a60f51cda4ec8103',
        //TODO ACA SE DEBE REMPLZAR '******' POR EL ClientSecrect
        clientSecret: '******',
        callbackUrl: 'http://localhost:8080/api/sessions/githubcallback' },
    async(accessToken, refreshToken, profile, done) => {
        try{
            let user = await userManager.getUserByEmail(profile._json.email)
            if(!user){
                let newUser = {                    
                    first_name: profile._json.name ,
                    last_name: ' ',
                    date_of_birth: ' ',
                    email: profile._json.email,
                    password: ' ',
                    rol:'user'
                }
                const result = await userManager.addUser(newUser)
                return done(null, result)
            }else{                
                return done(null, user)
            }
        }catch(error){
            done(error)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user)
    })

    passport.deserializeUser(async (id, done) => {
        let user = await userManager.getUserById(id)
        done(null, user)
    })
}

module.exports = { initPassport, initPassportGithub }