
const { check, body, validationResult, ExpressValidator } = require("express-validator")


module.exports = commonValidations = {

    /**
     * 
     * @param {string} path - The name of the path that is going to be checked 
     * @returns 
     */
    validateUsername: (path) => 
        check(path)
            .trim()
            .escape()
            .not()
            .isEmpty()
            .withMessage('User name can not be empty!')
            .bail()
            .custom((value) => {
                return !value.includes(' ');
            })
            .withMessage('Username can not have white spaces!')
            .bail()
    ,    
    
    
    /**
     * 
     * @param {string} path - The name of the path that is going to be checked 
     * @returns 
     */
    validatePassword: (path) =>
        check(path)
            .trim()
            .not()
            .isEmpty()
            .withMessage('The password cannot be empty!')
            .bail()
            .isLength({min: 8})
            .withMessage('Password must be at least 8 characters!')
            .bail()
            .custom((value) => {
                return !value.includes(' ');
            })
            .withMessage('Username can not have white spaces!')
            .bail()
        ,
}

  