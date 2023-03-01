require("dotenv").config();
// var xss = require("xss-clean");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
// const helmet = require("helmet");
// const mongoSanitize = require("express-mongo-sanitize");
// var clean = require("xss-clean/lib/xss").clean;
// var cleaned = clean("<script></script>");
// const rateLimit = require("express-rate-limit");
// const hpp = require("hpp")
const PORT = process.env.PORT;

//security packages
// app.use(helmet());
// app.use(mongoSanitize());
// app.use(bodyParser.urlencoded())
// app.use(hpp())
// app.use(xss());
// const createRequestLimiter = rateLimit({
//     windowMS: 5 *60 * 60 * 1000, //5 hours
//     max: 15,
//     standardHeaers: true,
//     legacyHeaders: true,
//     message: "too many leave requests sent from this IP",
//   });
//createRequestLimiter()
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
