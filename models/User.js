const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId: {
        type: String,
        default:null
    },
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please add a valid email',
        ],
    },
    password: {
        type: String,
        required: [true, 'User password'],
        select: false,
        minlength: 6
    },
    avatar: {
        type: String,
        default: "https://res.cloudinary.com/amosmoyo/image/upload/v1642018657/cld-sample.jpg"
    }
}, 
{
    timestamps: true
})

module.exports = mongoose.model('user', userSchema)