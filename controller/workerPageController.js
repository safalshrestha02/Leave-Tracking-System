const path = require("path");
const worker = require("./../models/AddWorker");
const messages = require("../models/RequestForLeave");

exports.landingPage = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "./views", "index.html"));
};

exports.workerLogin = (req, res, next) => {
  res.sendFile(
    path.join(
      __dirname,
      "../",
      "./views",
      "./components",
      "./login",
      "worker_login.html"
    )
  );
};

exports.homePage = (req, res, next) => {
  res.sendFile(
    path.join(
      __dirname,
      "../",
      "./views",
      "./components",
      "./worker",
      "worker_home.html"
    )
  );
};

exports.leavePage = (req, res, next) => {
  res.sendFile(
    path.join(
      __dirname,
      "../",
      "./views",
      "./components",
      "./worker",
      "worker_applyLeave.html"
    )
  );
};

exports.workerProfile = (req, res, next) => {
  res.sendFile(
    path.join(
      __dirname,
      "../",
      "./views",
      "./components",
      "./worker",
      "worker_profile.html"
    )
  );
};

exports.leaveHistory = (req, res, next) => {
  res.sendFile(
    path.join(
      __dirname,
      "../",
      "./views",
      "./components",
      "./worker",
      "worker_leaveHistory.html"
    )
  );
};

exports.apiMessages = (req, res, next) => {
  messages.find().then((result) => {
    res.send(result);
  });
};

exports.apiWorkers = (req, res, next) => {
  worker.find().then((result) => {
    res.send(result);
  });
};
