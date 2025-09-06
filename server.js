// Cars Project
/*
1. Set Up Your project structure

INSTALL
    . npm i express
    . npm init -y (for package.json & package-lock.json )
    . npm i ejs (for npm)
    . npm i nodemon (auto server run)
    . npm i morgan (detect and show messages)
    . npm i mongoose dotenv (for database)
    . npm i method-override (to delete from database)
FILES
    . .gitignore
    . .env

    . /models/Obj.js
    . /views/...

---------------------------- SETUP -----------------------------*/
const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const app = express();

// 4. Establish database connection
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const Car = require("./model/Car.js");

const morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false })); 

app.use(methodOverride("_method"));
app.use(morgan("dev"));
/* ----------------------------- PATH ---------------------------------- */
// 2. Create the server and test route
/*
app.get("/", async (req, res) => {
  //res.send("hello, friend!");
  res.render("index.ejs");
});
*/

// 5. Create routes and views for CRUD operations

app.get("/new", async (req, res) => {
  res.render("");
});
/* ----------------------------- TCP ---------------------------------- */
app.listen(3000, () => {
  console.log('Listening on port 3000');
});