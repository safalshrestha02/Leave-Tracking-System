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

module.exports.login = async (req, res, next) => {
  const { email, password, companyName } = req.body;
  try {
    const client = await Client.login(email, password, companyName);
    res.send('you are logged in')
    location.assign('/')
  } catch (err) {
    console.log(err.message);
  }
};
