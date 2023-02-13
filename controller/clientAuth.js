const Client = require("../models/ClientRegistration");
const jwt = require("jsonwebtoken");

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const handleErr = (err) => {
  let errors = {
    companyName: "",
    companyAddress: "",
    name: "",
    email: "",
    password: "",
  };

  if (err.message === "Invalid Credentials") {
    errors.companyName = "*invalid Credentials";
    errors.email = "*invalid Credentials";
    errors.password = "*invalid Credentials";
  }

  if (err.code === 11000) {
    errors.companyName = "*that company is already registered";
    errors.email = "*that email is already registered";
    errors.password = "*password must be 8 characters or above";

    return errors;
  }

  if (err.message.includes("registerClient validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

exports.registerClient = async (req, res) => {
  const { companyName, companyAddress, name, email, password } = req.body;
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
    res.status(201).json({ message: "registered" });
  } catch (err) {
    const errors = handleErr(err);
    res.status(401).json({ errors });
  }
};

exports.login = async (req, res, next) => {
  const { email, password, companyName } = req.body;
  try {
    const client = await Client.login(email, password, companyName);
    const token = createToken(client._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).redirect("/client_home");
  } catch (err) {
    const errors = handleErr(err);
    res.status(400).json({ errors });
  }
};
