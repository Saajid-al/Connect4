const { hash } = require("bcrypt");
const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        min: 4
    } ,
    email: { 
        type: String,
        required: true,
        min: 3,
        max: 300,
    },
    password:{
        type: String,
        required: true,
        min: 4
    },
    date: {
        type: Date,
        default: Date.now
    },  
})

module.exports = mongoose.model("user", usersSchema);