const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from express app!");
});

app.post("/", (req, res) => {
  res.send("You can post to this route!");
});

app.listen(PORT, () => {
  console.log(`App live at http://localhost:${PORT}`);
});
