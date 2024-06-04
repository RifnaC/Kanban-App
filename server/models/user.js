import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password:{
        type: String,
        required: true
    },
    tokens:[{
        token:{
            type: String,
            required: true
        }
    }]
});

const User = mongoose.model('User', userSchema, "users");
export {User as User} 
