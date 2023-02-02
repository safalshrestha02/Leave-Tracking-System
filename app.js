require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

//routes
//const connectDB = require("./config/connect");
const loginPage = require("./routes/loadPages");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// connectDB();

app.get("/", loginPage);
app.get("/home", loginPage);
app.get("/leave", loginPage);

// mongoose.connection.once("open", () => {
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
// });
