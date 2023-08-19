
const User = require('../Models/user.model');

const bcrypt = require('bcryptjs');

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
        const existingUser = await User.findOne({name: user.name});

        if(existingUser) throw('Already exists this name');

        // If not, Register the new user
                
        var encryptedPassword = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));

        const newUser = new User({
            name: user.name,
            password: encryptedPassword,
        })
        
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
        
        const usernameToDelete = data.name;
        const passwordUsernameToDelete = data.password;

        const userSaved = await User.findOne({ name: usernameToDelete })

        let result = bcrypt.compareSync(passwordUsernameToDelete, userSaved.password);
       
        if (result) {

            await User.findOneAndDelete({ name: usernameToDelete })

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
        
        const userSaved = await User.findOne({ name: userRequested.name })

        let result = bcrypt.compareSync(userRequested.password, userSaved.password);

        if (result){
            return{
                user: userSaved
            }
        }
        else throw('The user was not found')
    },
}

module.exports = userService;