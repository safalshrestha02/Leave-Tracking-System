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

    if (err.message.includes("companyName")) {
      errors.companyName = "*that company is already registered";
    };

    if (err.message.includes("email")) {
      errors.email = "*that email is already registered";
    };

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
    res.status(201).json({client: client._id});
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
    res.status(201).redirect("/client_home");
  } catch (err) {
    const errors = handleErr(err);
    res.status(400).json({ errors });
  }
};
