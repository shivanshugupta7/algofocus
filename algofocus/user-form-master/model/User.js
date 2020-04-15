const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        maxlength: 32,
        unique: true
    },
    dob: {
        type: Date,
        default: Date.now,
        trim: true,
        required: true
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User