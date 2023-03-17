//dependencies
require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT;

//security dependencies
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const hpp = require("hpp");

mongoose.set("strictQuery", true);

//security packages
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(
  mongoSanitize({
    replaceWith: "_",
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(hpp());
app.use(cors());

const connectDB = require("./config/connectDB");
const worker = require("./routes/workerRoutes");
const client = require("./routes/clientRoutes");
const tempRoutes = require("./routes/tempRoutes");

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

//routes
app.get("/", (req, res, next) => {
  res.sendFile(path.join(__dirname, "./views", "index.html"));
});

app.use("/", client);
app.use("/", worker);

//render all data
app.use("/", tempRoutes);

//connect to DB
connectDB();
const server = app.listen(
  PORT,
  console.log(`\x1b[94m\x1b[4mServer running on port ${PORT}`)
);
