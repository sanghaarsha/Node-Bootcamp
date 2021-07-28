const express = require("express");
const app = express();

// importing custom routers
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

// middlewares
app.use(express.json());

// serving static files
app.use(express.static(__dirname + "/public"));

// Mounting Express Router
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
