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

// GET /
app.get("/", async (req, res) => {
  res.render("index.ejs");
});

// GET /cars/new
app.get("/cars/new", (req, res) => {
  res.render("cars/new.ejs");
});

// GET /cars/:id (this must be after new path)
app.get("/cars/:carId", async (req, res) => {
  const foundCar = await Car.findById(req.params.carId);
  res.render("cars/show.ejs", { Car: foundCar });
});

// POST /cars
app.post("/cars", async (req, res) => {
  
  await Car.create(req.body);
  res.redirect("/cars/new");
});

// GET /cars
app.get("/cars", async (req, res) => {
  const allcars = await Car.find();
  //console.log(allcars); // log the cars!
  res.render("cars/index.ejs", { cars: allcars });
});

// delete function
app.delete("/cars/:carId", async (req, res) => {
  await Car.findByIdAndDelete(req.params.carId);
  res.redirect("/cars");
});

// delete Item route
app.delete("/cars/:carId", (req, res) => {
  res.send("This is the delete route");
});

// GET localhost:3000/cars/:carId/edit
app.get("/cars/:carId/edit", async (req, res) => {
  const foundCar = await Car.findById(req.params.carId);
  //console.log(foundCar);
  res.render("cars/edit.ejs", {
    car: foundCar,
  });
});

// update function
app.put("/cars/:carId", async (req, res) => {
  
  // Update the car in the database
  await Car.findByIdAndUpdate(req.params.carId, req.body);

  // Redirect to the car's show page to see the updates
  res.redirect(`/cars/${req.params.carId}`);
});

/* ----------------------------- TCP ---------------------------------- */
app.listen(3000, () => {
  console.log('Listening on port 3000');
});