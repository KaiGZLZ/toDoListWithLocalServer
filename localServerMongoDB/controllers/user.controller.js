
const express = require('express');
const userService = require('../services/user.service');
const { userRegisterValidation, userDeleteValidation, userLoginValidation, userAuthenticateValidation, userForgotenPasswordValidation, userChangePasswordValidation } = require('../validators/user.validator');
const router = express.Router();

// routes
router.post('/register', userRegisterValidation, userRegister);
router.delete('/delete', userDeleteValidation, userDelete);
router.post('/login', userLoginValidation, userLogin);
router.post('/authenticate', userAuthenticateValidation, userAuthenticate);
router.post('/forgotten-password', userForgotenPasswordValidation, userForgotenPassword);
router.post('/change-password', userChangePasswordValidation, userChangePassword);

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

// Login a new user
function userLogin(req, res, next) {
    userService.userLogin(req.body)
        .then(data =>res.json(data))
        .catch(err => next(err));
}

// Authenticate a new user
function userAuthenticate(req, res, next) {
    userService.userAuthenticate(req.body)
        .then(data =>res.json(data))
        .catch(err => next(err));
}

// Funtion to send an recovery email if the password was forgotten
function userForgotenPassword(req, res, next) {
    userService.sendRecoveryEmail(req.body)
        .then(data =>res.json(data))
        .catch(err => next(err));
}

// Function to change the password after the email was sent
function userChangePassword(req, res, next) {
    userService.userChangePassword(req.body)
        .then(data =>res.json(data))
        .catch(err => next(err));
}