const path = require("path");
const worker = require("./../models/AddWorker");
const messages = require("../models/RequestForLeave");

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

