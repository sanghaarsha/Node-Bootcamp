// Dotenv Setup
require("dotenv").config();
const PORT = process.env.PORT || 3000;

const app = require("./app");

// env set by express -> app.get("env")
// env set by node -> process.env

// Listen the app at PORT
app.listen(PORT, () => {
  console.log(`App live at http://localhost:${PORT}`);
});
