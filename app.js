require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

//pages
const worker = require("./routes/workerRoutes");
const client = require("./routes/clientRoutes");
//APIs

const DBrui = process.env.DBrui;
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

//html rendering
app.use("/", worker); //worker side
app.use("/", client); //client side

//api routes
app.use("/client_registration", client);
app.use("/add-worker", worker);
//render all data
app.get("/api/workers", worker);
app.get("/api/clients", client);
app.get("/api/leaveMessages", worker)

// connectDB();
const Person = mongoose.connect(DBrui).then((result) => {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
});