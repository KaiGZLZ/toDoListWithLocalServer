
const express = require('express');
const userService = require('../services/user.service');
const { userRegisterValidation, userDeleteValidation, userAuthenticateValidation } = require('../validators/user.validator');
const router = express.Router();

// routes
router.post('/register', userRegisterValidation, userRegister);
router.delete('/delete', userDeleteValidation, userDelete);
router.post('/authenticate', userAuthenticateValidation, userAuthenticate);

module.exports = router;


// Register a new user 
function userRegister(req, res, next) {
    userService.userRegister(req.body)
        .then(data =>res.json(data))
        .catch(err => next(err));
}

// Delete an user
function userDelete(req, res, next) {
    userService.userDelete(req.body)
        .then(data =>res.json({data}))
        .catch(err => next(err));
}

// Register a new user 
function userAuthenticate(req, res, next) {
    userService.userAuthenticate(req.body)
        .then(data =>res.json(data))
        .catch(err => next(err));
}
