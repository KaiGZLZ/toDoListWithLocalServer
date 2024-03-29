const {check, body, validationResult, ExpressValidator } = require("express-validator");
const { validateUsername, validatePassword, validateEmail,  } = require("./commonValidations");

module.exports = {

    userRegisterValidation: [
        validateUsername('user.username'),
        check('user.firstname')
          .trim()
          .escape()
          .not()
          .isEmpty()
          .withMessage('User firstname can not be empty!')
          .bail()
        ,
        check('user.lastname')
          .trim()
          .escape()
          .not()
          .isEmpty()
          .withMessage('User lastname can not be empty!')
          .bail()
        ,
        validatePassword('user.password'),
        validatePassword('user.passwordConfirmation')
            .custom((value, { req }) => {
              return value === req.body.user.password;
            })
            .withMessage('The password confirmation does not match with the password!')
            .bail(),
            
        (req, res, next) => {
          const errors = validationResult(req);
          if (!errors.isEmpty())
            return res.status(422).json({message: errors.array()[0].msg});
          next();
        },
    ],
      
    userDeleteValidation: [
        body('password')
            .trim()
            .not()
            .isEmpty()
            .withMessage('The password cannot be empty!')
            .bail()
            .isLength({min: 8})
            .withMessage('Password must be at least 8 characters!')
            .bail(),
            
        (req, res, next) => {
          const errors = validationResult(req);
          if (!errors.isEmpty())
            return res.status(422).json({message: errors.array()[0].msg});
          next();
        },
    ],

    userLoginValidation: [
        validateUsername('userRequested.username'),
        validatePassword('userRequested.password'),
        
        (req, res, next) => {
          const errors = validationResult(req);
          if (!errors.isEmpty())
            return res.status(422).json({message: errors.array()[0].msg});
          next();
        },
    ],
    
    userAuthenticateValidation: [
      body('token')
          .trim()
          .not()
          .isEmpty()
          .withMessage('Invalid activation token')
          .bail(),
          
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(422).json({message: errors.array()[0].msg});
        next();
      },
    ],

    userForgotenPasswordValidation: [

      validateEmail('data.email'),
          
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(422).json({message: errors.array()[0].msg});
        next();
      },
    ],

    userChangePasswordValidation: [

      validatePassword('data.password'),
      validatePassword('data.passwordConfirmation')
        .custom((value, { req }) => {
          return value === req.body.data.password;
        })
        .withMessage('The password confirmation does not match with the password!')
        .bail(),
      body('data.token')
        .trim()
        .not()
        .isEmpty()
        .withMessage('Invalid activation token')
        .bail(),
          
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty())
          return res.status(422).json({message: errors.array()[0].msg});
        next();
      },
    ],
}

  