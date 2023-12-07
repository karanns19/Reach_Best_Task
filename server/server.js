// Import Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require ('cors');
const model = require("./models/model")

// Created App Component
const app = express();
app.use(express.json()); 
app.use(cors());

// Connected MongoDB
mongoose.connect("mongodb://localhost:27017/books",{
    useNewUrlParser:true,
    useUnifiedTopology: true
}).then(()=> console.log("Database connected"))

// API - To create new users
app.post("/users/new", async(req, res) =>{
    const user = new model({
        email: req.body.email,
        password: req.body.password,
    });
    user.save(); 
    res.json(user)
})

// API - Get all the users from DB
app.get("/users", async(req, res)=>{
    const users = await model.find()
    res.json(users)
})

// Server Running at PORT 3001
app.listen(3001,()=> console.log("Server started"));


