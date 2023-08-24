const mongoose = require('mongoose');

const { Schema } = mongoose;

const taskSchema = new Schema ({

    id: String, 
    title: { type: String, required: true }, 
    description: String,
    responsible: String,
    priority: { type: Number, required: true } 
})


const userSchema = new Schema (
    {
        username: { type: String, required: true, unique: true },
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        
        tasks: [taskSchema]

    }, {
        // The id and password are deleted at the time of sending the data to the client
        toJSON: { 
            virtuals: true,
            transform: function (doc, ret) {
                delete ret._id;
                delete ret.id;
                delete ret.password;
            }
        }
    }
)

module.exports = mongoose.model('User', userSchema);

