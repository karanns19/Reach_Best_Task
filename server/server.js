// Import Dependencies
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const model = require("./models/model")
require('dotenv').config();

// Created App Component
const app = express();
app.use(express.json());
app.use(cors());

// Connected MongoDB
mongoose.connect("mongodb://localhost:27017/books", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Database connected"))


// API - To create new users
app.post("/users/new", async (req, res) => {
    const user = new model({
        email: req.body.email,
        password: req.body.password,
    });
    user.save();
    res.json(user)
})

// API - To Store User Data
app.put('/users/update/:id', async (req, res) => {
    const response = await model.findById(req.params.id);
    response.genre.push(req.body.genres)
    response.author.push(req.body.authors)
    response.save();
    res.json(response);
})

// API - Get all the users from DB
app.get("/users", async (req, res) => {
    const users = await model.find()
    res.json(users)
})

// Server Running at PORT 3001
app.listen(3001, () => console.log("Server started"));




