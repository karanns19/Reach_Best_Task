const mongoose = require("mongoose")
const schema = mongoose.Schema

// Created User Schema
const users = new schema({
    email:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    },
})

const model = mongoose.model("model",users)
module.exports = model
