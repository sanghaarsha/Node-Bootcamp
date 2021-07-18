const app = require("./app");

// Dotenv Setup
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// Listen the app at PORT
app.listen(PORT, () => {
  console.log(`App live at http://localhost:${PORT}`);
});
