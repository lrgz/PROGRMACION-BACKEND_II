const UserDto = require('../dto/userDTO')
const { userService, cartService } = require('../service')
const { createHash, isValidPassword } = require('../utils/bcrypt')
const { generateToken, generateTokenResetPassword, decodeJWT } = require('../utils/jwt')
const CustomError = require('../utils/Errors/errorMessage')
const Errors = require('../utils/Errors/errors')
const { generateUserErrorInfo } = require('../utils/Errors/errorMessage')
const transport = require('../utils/nodemail')

class UserController {

    register = async(req, res, next) => {
        try{
            const { first_name, last_name, email, password, date_of_birth } = req.body

            if(!first_name || !last_name || !email){
                CustomError.createError({
                    name: 'User creation error',
                    cause: generateUserErrorInfo({first_name, last_name, email}),
                    message: 'Error trying to create a user',
                    code: Errors.INVALID_TYPE_ERROR
                })
            }

            
            const user = await userService.getByEmail(email)
            if(user) return 'A user already exists with that email' 

            let role = ''
            email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD ? role = 'admin' : role = 'user'
            
            const newUser = {
                first_name,
                last_name,
                date_of_birth,
                email,
                password: createHash(password),
                cart: await cartService.create(),
                role                
            }
            let result = await userService.create(newUser)
            return { result }
        }catch(error){
            next(error)
        }
    }

    login = async(req, res,next) => {
        const { email, password } = req.body
    
        const userDB = await userService.getByEmail(email)
            try{
                if(!userDB) return res.send({status: 'error', message: 'There is not a user with the email: ' + email})
                
                if(!isValidPassword(userDB, password)) return res.send({status: 'error', message: 'Your user password does not match the entered password'})

                const access_token = generateToken(userDB)

                res.cookie(process.env.JWT_COOKIE_KEY, access_token, {maxAge: 3600000, httpOnly: true})
    
                return { access_token }
            }catch(error){
                return error
            }
    }

    logout = (req, res,next)=>{
        res.clearCookie(process.env.JWT_COOKIE_KEY)
        return 'Succesfully logged out'
    }

    current = (req, res,next) => {
        const user = req.user;
        const { first_name, last_name, email, role  } = new UserDto(user)
        return {first_name, last_name, email, role}        
    }


    recoverPassword = async(req, res, next) => {
        const { email } = req.body

        const userDB = await userService.getByEmail(email)
            try{
                if(!userDB){
                    CustomError.createError({
                        name: 'Could not find user',
                        cause: null,
                        message: 'Error trying to find a user with the email: ' + email,
                        code: EErrors.INVALID_TYPE_ERROR
                    })
                }

                const token = generateTokenResetPassword(userDB)

                let result = await transport.sendMail({
                    from: 'Recover Password <lrgz.developer@gmail.com',
                    to: email,
                    subject: 'Recover password',
                    html: `
                    <div>
                        <h1>Recover your password</h1>
                        <a href="http://localhost:8080/updatePassword/${token}">Click me to recover your password</a>
                        <p>This link to reset your password is only valid for 1 hour</>
                    </div>
                    `
                })
            }catch(error){
                throw error
            }
    }

    updatePassword = async(req, res, next) => {
            const { token, password } = req.body

            try{
                const user = decodeJWT(token)

                if(isValidPassword(user.user, password) == true)
                    res.send({status: 'error', message: "You can't enter the same password you had before"})

                const hashedPassword = createHash(password)
                let result = await userService.update({_id: user.user._id}, {password: hashedPassword})
                console.log(await userService.update({_id: user.user._id}, {password: hashedPassword}))
                return result
            }catch(error){
                throw error
            }
    }    

    premiumUser = async(req, res, next) => {
        const { uid } = req.params

        const userDB = await userService.getById(uid)
        try{
            if(!userDB)
                CustomError.createError({
                    name: 'Could not find user',
                    cause: null,
                    message: 'Error trying to find a user with the id: ' + uid,
                    code: EErrors.INVALID_TYPE_ERROR
            })

            let newRole = ''
            userDB.role === 'user' ? newRole = 'premium' : newRole = 'user'

            const newRoleUser = await userService.update({_id: uid}, {role: newRole})
            const result = await userService.getById(uid)
            return result
        }catch(error){
            throw error
        }
    }    
}

module.exports = new UserController()