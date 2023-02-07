require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

//routes
const workerPages = require("./routes/workerPagesRoutes");
const clientPages = require("./routes/clientPageRoutes");
const clientRegistration = require("./routes/clientRoutes");
const workerRegistration = require("./routes/employeeRoutes");

const DBrui = process.env.DBrui;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

//html rendering
app.get("/", workerPages);

//worker side
app.use("/", workerPages);

//client side
app.use("/", clientPages);

//routes for posting data to backend
app.use("/client_registration", clientRegistration);
app.use("/add-worker", workerRegistration);

// connectDB();
const Person = mongoose.connect(DBrui).then((result) => {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
});
