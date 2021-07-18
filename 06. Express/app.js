const express = require("express");
const app = express();

// importing custom routers
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

// middlewares
app.use(express.json());

// Mounting Express Router
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;
