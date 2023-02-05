require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

//routes
const loadPages = require("./routes/loadPages");
const clientRegistration = require("./routes/clientRoutes");
const workerRegistration = require("./routes/employeeRoutes");

const DBrui =
  "mongodb+srv://safal1234:safal1234@cluster0.cgli9ia.mongodb.net/mongoPrac?retryWrites=true&w=majority";

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

//html rendering
app.get("/", loadPages);
app.get("/home", loadPages);
app.get("/leave", loadPages);

//routes for posting data to backend
app.use("/client_registration", clientRegistration);
app.use("/add-worker", workerRegistration);

// connectDB();
const Person = mongoose.connect(DBrui).then((result) => {
  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
});
