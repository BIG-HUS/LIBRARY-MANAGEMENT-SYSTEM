const express = require("express");
const app = express(); //creating an express app instance
const PORT = process.env.PORT || 3001;

//MIDDLEWARE
app.use(express.json());

//LOADING .env FILE
require('dotenv').config();

//CONNECT DB
const connectDb = require("./config/database.js");
connectDb();

//IMPORT ROUTES
const studentRoutes = require('./routes/student.route')


//USE ROUTES
app.use('/students', studentRoutes);
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});