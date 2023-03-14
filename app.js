require("dotenv").config();
var xss = require("xss-clean");
var clean = require("xss-clean/lib/xss").clean;
var cleaned = clean("<script></script>");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const cors = require("cors");
const hpp = require("hpp");
const PORT = process.env.PORT;
const connectDB = require("./config/connectDB");

//security packages
app.use(helmet());
app.use(mongoSanitize());
app.use(bodyParser.urlencoded());
app.use(hpp());
app.use(xss());
app.use(cors());

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

app.use("/", client); //client side
app.use("/", worker); //worker side
mongoose.set("strictQuery", true);
//render all data
app.use("/", tempRoutes);
connectDB();

const server = app.listen(PORT, console.log(`\x1b[94m\x1b[4mServer running on port ${PORT}`));
