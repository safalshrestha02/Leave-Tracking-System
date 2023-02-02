require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

//routes
//const connectDB = require("./config/connect");
const loadPages = require("./routes/loadPages");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// connectDB();

app.get("/", loadPages);
app.get("/home", loadPages);
app.get("/leave", loadPages);

// mongoose.connection.once("open", () => {
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
// });
