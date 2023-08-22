const { expressjwt } = require('express-jwt');

const config = require('../config.json');
const userService = require('../services/user.service');
const User = require('../Models/user.model');

module.exports = jwt;

function jwt() {
    const secret = config.secret;
    return expressjwt({ secret, algorithms: ["HS256"], isRevoked }).unless({
        path: [
            // Public routes that do not require authentication
            '/user/authenticate',
            '/user/register',
        ]
    })
}

async function isRevoked(req, {header, payload, signature}) {

    // In the authentication, if the user exists, it will be added in the req.body as _user
    const _user = await User.findById(payload.sub).lean();
   
    if (_user) {

        Object.assign(req.body, {_user}); 
        return false;
    }
    else return true
};