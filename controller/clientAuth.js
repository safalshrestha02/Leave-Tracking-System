const Client = require("../models/ClientRegistration");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const maxAge = 2 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const handleErr = (err) => {
  let errors = {
    email: "",
    password: "",
  };

  if (err.message === "Invalid Credentials") {
    errors.email = "*Invalid Credentials";
    errors.password = "*Invalid Credentials";
  }

  if (err.code === 11000) {
    if (err.message.includes("companyName")) {
      errors.companyName = "*that company is already registered";
    }

    if (err.message.includes("email")) {
      errors.email = "*that email is already registered";
    }

    return errors;
  }

  if (err.message.includes("client validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

exports.registerClient = async (req, res) => {
  const {
    clientID,
    companyName,
    companyID,
    companyAddress,
    name,
    email,
    password,
  } = req.body;
  try {
    const client = await Client.create({
      clientID,
      companyName,
      companyID,
      companyAddress,
      name,
      email,
      password,
    });

    const token = createToken(client._id);

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ client: client._id });
  } catch (err) {
    const errors = handleErr(err);
    res.status(401).json({ errors });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const client = await Client.login(email, password);
    const token = createToken(client._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ message: "logged in" });
  } catch (err) {
    const errors = handleErr(err);
    res.status(400).json({ errors });
  }
};

exports.logout = async (req, res, next) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
