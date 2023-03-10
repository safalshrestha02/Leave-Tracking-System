const path = require("path");

exports.registerClient = (req, res, next) => {
  res.sendFile(
    path.join(
      __dirname,
      "../",
      "./views",
      "./components",
      "./client",
      "client_registration.html"
    )
  );
};

exports.clientLogin = (req, res, next) => {
  res.sendFile(
    path.join(
      __dirname,
      "../",
      "./views",
      "./components",
      "./login",
      "client_login.html"
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

exports.clientForgotPassword = (req, res, next) => {
  res.sendFile(
    path.join(
      __dirname,
      "../",
      "./views",
      "./components",
      "./utility",
      "client_forgot_password.html"
    )
  );
};

exports.clientResetPassword = (req, res, next) => {
  res.sendFile(
    path.join(
      __dirname,
      "../",
      "./views",
      "./components",
      "./utility",
      "client_reset_password.html"
    )
  );
};
