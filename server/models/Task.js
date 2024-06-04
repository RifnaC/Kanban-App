import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    status: String,
    tasks: [{
        title:{
            type: String,
            required: true
        },
        description:{
            type: String,
            required: true
        },
        dueDate:{
            type: Date,
            required: true,
            default: Date.now()
        }
    }]
})

const Task = mongoose.model('Task', taskSchema, "tasks");
export {Task as Task} 