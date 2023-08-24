
const jsonwebtoken = require('jsonwebtoken');
const User = require('../Models/user.model');

const bcrypt = require('bcryptjs');
const config = require('../config');

let userService = {

    /**
     * Funtion to register an user
     * 
     * @param {object} data
     * @param {string} data.user - Users username
     * @param {string} data.user - Users password
     * 
     */
    userRegister: async (data) => {

        const user = data.user;

        // Look if there is a user with the same name
        const existingUser = await User.findOne({username: user.username});

        if(existingUser) throw('Already exists this username');

        // If not, Register the new user
                
        let encryptedPassword = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
        user.password = encryptedPassword;

        const newUser = new User(user)        
        await newUser.save()

        return {
            description: "El usuario se agregó correctamente",
        }
    },


    /**
     * Funtion to Delete an user
     * 
     * @param {object} data
     * @param {string} data.user - username
     * @param {string} data.user - password
     * 
     */
    userDelete: async (data) => {
        
        const passwordUsernameToDelete = data.password;

        let result = bcrypt.compareSync(passwordUsernameToDelete, data._user.password);
       
        if (result) {

            await User.findOneAndDelete({ username: data._user.username })

            return {
                result: true, 
                description: 'Usuario eliminado correctamente',
            }
        }
        else {            
            return {
                result: false, 
                description: 'La contraseña es incorrecta',
            }
        }
    },

    /**
     * Funtion to authenticate an user
     * 
     * @param {object} data - 
     * @param {string} data.user - Users username
     * @param {string} data.user - Users password
     * 
     */
    userAuthenticate: async (data) => {
        
        const userRequested = data.userRequested;
                        
        const user = await User.findOne({ username: userRequested.username })

        if (!user){
            throw('Therre is a problem with the username or the password')
        }

        let result = bcrypt.compareSync(userRequested.password, user.password);

        if (result){
            const token = jsonwebtoken.sign({ sub: user.id }, config.SECRET, {expiresIn: 60 * 60}); // Expiration time: 1h
                        
            return {
                user:{
                    ...user.toJSON(),
                    token,
                },
            };
        }
        else throw('The user was not found');
    },
}

module.exports = userService;