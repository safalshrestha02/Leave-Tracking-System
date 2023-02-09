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

  if (err.code === 11000) {
    errors.companyName = "That company is already registered";
    errors.email = "That email is already registered";

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
    res.status(201).json({
      client: client._id,
    });
  } catch (err) {
    const errors = handleErr(err);
    res.status(401).json({ errors });
  }
};

// exports.login = async (req, res, next) => {
//   const { email, password, companyName } = req.body;
//   try {
//     const client = await Client.login(email, password, companyName);
//   } catch (err) {
//     console.log(err.message);
//   }
// };
