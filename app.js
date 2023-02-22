require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT;

const worker = require("./routes/workerRoutes");
const client = require("./routes/clientRoutes");
const tempRoutes = require("./routes/tempRoutes");

const DBrui = process.env.DBrui;
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

//routes
app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "./views", "index.html"));
});

app.use("/", client); //client side
app.use("/", worker); //worker side

//render all data
app.use("/", tempRoutes);

// connectDB();
const Person = mongoose.connect(DBrui).then((result) => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
