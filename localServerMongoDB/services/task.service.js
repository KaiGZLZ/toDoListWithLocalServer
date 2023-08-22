
const User = require('../Models/user.model');

let taskService = {


    /**
     * Funtion to get all the tasks
     * 
     * @param {object} data
     * 
     */
    taskGetAll: async (data) => {

        const user = await User.findById(data._user._id).lean();
        
        return {    
            tasks: [...user.tasks]
        };
    },


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

        const user = await User.findById(data._user._id);
        
        user.tasks.unshift(newTask);
    
        let userModified = await user.save();

        return {    
            result: true, 
            description:'Tarea agregada correctamente',
            tasks: userModified.tasks
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
        
        let idToToDoToDelete = data.idToDoToEliminate;
        
        const user = await User.findById(data._user._id);

        if (user) {

            // The task is found by the id and deleted
            const indexToDoToDelete = user.tasks.findIndex((toDo) => toDo.id == idToToDoToDelete);
        
            user.tasks.splice(indexToDoToDelete, 1);
        
            await user.save();
            
            return {
                result: true, 
                description:'Tarea eliminada correctamente',
                tasks: [...user.tasks]
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