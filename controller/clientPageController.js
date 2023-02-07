const path = require("path");
const Client = require("./../models/ClientRegistration");
const jwt = require("jsonwebtoken");
const maxage = 1 * 24 * 60 * 60;

exports.homePage = (req, res, next) => {
  res.sendFile(
    path.join(
      __dirname,
      "../",
      "./views",
      "./components",
      "./client",
      "client_home.html"
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
      "./client",
      "client_leave_history.html"
    )
  );
};

exports.leaveSettings = (req, res, next) => {
  res.sendFile(
    path.join(
      __dirname,
      "../",
      "./views",
      "./components",
      "./client",
      "client_leave_settings.html"
    )
  );
};

exports.manageLeave = (req, res, next) => {
  res.sendFile(
    path.join(
      __dirname,
      "../",
      "./views",
      "./components",
      "./client",
      "client_manage_leave.html"
    )
  );
};

exports.manageWorker = (req, res, next) => {
  res.sendFile(
    path.join(
      __dirname,
      "../",
      "./views",
      "./components",
      "./client",
      "client_manage_worker.html"
    )
  );
};

exports.clientProfile = (req, res, next) => {
  res.sendFile(
    path.join(
      __dirname,
      "../",
      "./views",
      "./components",
      "./client",
      "client_profile.html"
    )
  );
};

module.exports.login = async (req, res, next) => {
  const { email, password, companyName } = req.body;
  try {
    const client = await Client.login(email, password, companyName);
  } catch (err) {
    console.log(err.message);
  }
};
