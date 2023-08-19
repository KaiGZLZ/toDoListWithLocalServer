
const User = require('../Models/user.model');

let taskService = {

    /**
     * Funtion to register an task
     * 
     * @param {object} data
     * @param {string} data.user - the owner of the data to be added
     * @param {string} data.task - data task object
     * 
     */
    taskRegister: async (data) => {

        const newTask = data.task;
        //const user = data.user;
 
        const user = await User.findOne({name: data.name});

        user.tasks.unshift(newTask);
    
        await user.save();
        return {
            result: true, 
            description:'Tarea agregada correctamente'
        };
    },

    /**
     * Funtion to authenticate an task
     * 
     * @param {object} data - 
     * @param {string} data.task - tasks taskname
     * @param {string} data.idToDoToEliminate - tasks id
     * 
     */
    taskDelete: async (data) => {
        
        let usernameOwner = data.name;
        let idToToDoToDelete = data.idToDoToEliminate;
        
        const user = await User.findOne({name: usernameOwner});

        if (user) {

            // The task is found by the id and deleted
            const indexToDoToDelete = user.tasks.findIndex((toDo) => toDo.id == idToToDoToDelete);
        
            user.tasks.splice(indexToDoToDelete, 1);
        
            await user.save();
            
            return {
                result: true, 
                description:'Tarea eliminada correctamente'
            };
        }
        else {
            return {
                result: false, 
                description:'El usuario no existe'
            };
        }
    },
}

module.exports = taskService;