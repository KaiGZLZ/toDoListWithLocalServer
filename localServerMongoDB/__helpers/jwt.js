const { expressjwt } = require('express-jwt');

const User = require('../Models/user.model');
const config = require('../config')

module.exports = jwt;

function jwt() {
    const secret = config.SECRET;
    return expressjwt({ secret, algorithms: ["HS256"], isRevoked, onExpired }).unless({
        path: [
            // Public routes that do not require authentication
            '/user/login',
            '/user/register',
            /^\/user\/authenticate/,    // authentication route
            /^\/user\/forgotten-password/,     // forgoten-password route
            /^\/user\/change-password/,     // forgoten-password route
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

async function onExpired (req, err) {
    if (new Date() - err.inner.expiredAt < 5000) { return;}
    throw err;
}