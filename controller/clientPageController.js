const path = require("path");

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

