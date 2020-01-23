import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        min: 2,
        max: 100
    },
    lastname: {
        type: String,
        required: true,
        min: 2,
        max: 100
    },
    login: {
        type: String,
        required: true,
        min: 4,
        max: 20
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    },
    date: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model('users', UserSchema);