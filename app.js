require("dotenv").config();
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT

const worker = require("./routes/workerRoutes");
const client = require("./routes/clientRoutes");

const clientAuth = require("./controller/clientPageController");
const workerAuth = require("./controller/workerPageController");
const landingPage = require("./controller/workerPageController");

const clientRegistration = require("./controller/clientAuth");

const { requireAuth } = require("./middleware/clientAuthMiddleware");

const DBrui = process.env.DBrui;
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

//routes
app.get("/", landingPage.landingPage);
app.get("/client_registration", clientAuth.registerClient);
app.get("/client_login", clientAuth.clientLogin);
app.get("/worker_login", workerAuth.workerLogin);

app.post("/client_registration", clientRegistration.registerClient);
app.post("/client_login", clientRegistration.login);

app.use("/", requireAuth, client); //client side
//app.use("/", client);
app.use("/", worker); //worker side

//render all data
app.get("/api/workers", worker);
app.get("/api/clients", client);
app.get("/api/leaveRequests", worker);

// connectDB();
const Person = mongoose.connect(DBrui).then((result) => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
