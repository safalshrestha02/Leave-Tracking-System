const path = require("path");
const Client = require("./../models/client");
const jwt = require("jsonwebtoken");

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

module.exports.clientRegistrationPage = async (req, res) => {
  const { companyName, companyAddress, name, email, password } = req.body;
  const FindCompany = await Client.findOne({ companyName: req.body.companyName });
  if (FindCompany != null) {
    console.log("Company name is already taken");
  } else {
    try {
      const client = await Client.create({
        companyName,
        companyAddress,
        name,
        email,
        password,
      });
      const token = createtoken(client._id);
      res.cookie("jwt", token, { httpOnly: true });
      res.status(201).json({ client: client._id });
    } catch (err) {
      res.status(400);
      console.log(err.message);
    }
  }
};