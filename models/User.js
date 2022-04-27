const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    googleId: {
        type: String
    }
}, 
{
    timestamps: true
})

module.exports = mongoose.model('user', userSchema)