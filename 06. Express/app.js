const express = require("express");
const app = express();

// dotenv setup
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// importing custom routers
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

// middlewares
app.use(express.json());

// Mounting Express Router
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// Listen the app at PORT
app.listen(PORT, () => {
  console.log(`App live at http://localhost:${PORT}`);
});
