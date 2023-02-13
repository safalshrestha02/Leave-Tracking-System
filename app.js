require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");

//pages
const worker = require("./routes/workerRoutes");
const client = require("./routes/clientRoutes");
//APIs

const DBrui = process.env.DBrui;
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

//routes
app.use("/", worker); //worker side
app.use("/", client); //client side

//render all data
app.get("/api/workers", worker);
app.get("/api/clients", client);
app.get("/api/leaveRequests", worker);

// connectDB();
const Person = mongoose.connect(DBrui).then((result) => {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
});
