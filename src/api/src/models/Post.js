import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        min: 2,
        max: 100
    },
    userId: {
        type: String,
        required: true
    },
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
    shared: {
        type: Boolean,
        required: true
    },
    content: {
        type: String,
        required: true,
        max: 2048
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('posts', PostSchema);