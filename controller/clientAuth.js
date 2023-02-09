const Client = require("../models/ClientRegistration");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

exports.registerClient = async (req, res) => {
  const { companyName, companyAddress, name, email, password } = req.body;
  const FindCompany = await Client.findOne({
    companyName: req.body.companyName,
  });
  if (FindCompany != null) {
    console.log("Company name is already taken");
  }
  try {
    const client = await Client.create({
      companyName,
      companyAddress,
      name,
      email,
      password,
    });
    const token = createToken(client._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({
      message: `Client registered successfully`,
    });
  } catch (err) {
    res.status(400);
    console.log(err.message);
  }
};

exports.login = async (req, res, next) => {
  const { email, password, companyName } = req.body;
  try {
    const client = await Client.login(email, password, companyName);
  } catch (err) {
    console.log(err.message);
  }
};
exports.register = async (req, res, next) => {
  const { email, companyName } = req.body;
  try {
    const client = await Client.register(email, companyName);
  } catch (err) {
    console.log(err.message);
  }
};
