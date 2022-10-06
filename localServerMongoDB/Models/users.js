const mongoose = require('mongoose');

const { Schema } = mongoose;


const userSchema = new Schema (
    {
        name: {
            type: String,
            unique: true,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        tareas: [
            {
                id: String, 
                title: { 
                    type: String, 
                    required: true
                }, 
                description: String,
                responsible: String,
                priority: { 
                    type: Number, 
                    required: true
                } 
            }
        ]
    }
)

module.exports = mongoose.model('User', userSchema);

