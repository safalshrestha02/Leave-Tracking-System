const path = require("path");

exports.loginPage = (req, res, next) => {
  res.sendFile(path.join(__dirname, "../", "./views", "index.html"));
};

exports.homePage = (req, res, next) => {
  res.sendFile(
    path.join(__dirname, "../", "./views", "./components", "home.html")
  );
};

exports.leavePage = (req, res, next) => {
  res.sendFile(
    path.join(__dirname, "../", "./views", "./components", "leave.html")
  );
};
