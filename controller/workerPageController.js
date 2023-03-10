const path = require("path");

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

exports.workerForgotPassword = (req, res, next) => {
  res.sendFile(
    path.join(
      __dirname,
      "../",
      "./views",
      "./components",
      "./utility",
      "worker_forgot_password.html"
    )
  );
};

exports.workerResetPassword = (req, res, next) => {
  res.sendFile(
    path.join(
      __dirname,
      "../",
      "./views",
      "./components",
      "./utility",
      "worker_reset_password.html"
    )
  );
};
