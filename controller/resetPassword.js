const path = require("path");

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
