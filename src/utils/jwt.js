const jwt = require('jsonwebtoken')

const generateToken = (user) => {
    return jwt.sign({user}, process.env.JWT_KEY, {expiresIn: '1d'});
};

function generateTokenResetPassword(user) {
    return jwt.sign({user}, process.env.JWT_RESET_PASSWORD_KEY, {expiresIn: '1h'});
}

const authToken = (req, res, next) => {
    const authCookie = req.headers.cookie;
    if (!authCookie) {
        return res.status(401).send({error: "User not authenticated or missing token."});
    }

    const token =  authCookie.split('=')[1];

    jwt.verify(token, process.env.JWT_KEY, (error, credentials) => {
        if (error) return res.status(403).send({error: "Token invalid, Unauthorized!"});
        req.user = credentials.user;
        next();
    });
};

const authTokenResetPassword = (req, res, next) => {
    const token = req.params.token

    jwt.verify(token, process.env.JWT_RESET_PASSWORD_KEY, (error, credentials) => {
        if (error) return res.status(403).send({error: "Token invalid, may have expired!"});
        req.user = credentials.user;
        next();
    });
};

const decodeJWT = (token) => {
    const payload = jwt.verify(token, process.env.JWT_RESET_PASSWORD_KEY)
    return payload
}

module.exports = { generateToken, authToken, generateTokenResetPassword, authTokenResetPassword, decodeJWT }