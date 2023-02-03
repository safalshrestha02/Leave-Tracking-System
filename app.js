require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

//routes
const loadPages = require("./routes/loadPages");

const DBrui =
  "mongodb+srv://Datamanagement:gKqq46vSnvymlnWk@cluster0.nkzwg3y.mongodb.net/People?retryWrites=true&w=majority";

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// connectDB();
const Person = mongoose.connect(DBrui).then((result)=>{
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
})
app.get("/", loadPages);
app.get("/home", loadPages);
app.get("/leave", loadPages);
app.post("/client_registration", loadPages);


// mongoose.connection.once("open", () => {

// });