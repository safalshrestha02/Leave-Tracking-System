const Worker = require("../models/AddWorker");
const jwt = require("jsonwebtoken");
const client = require('./../models/ClientRegistration')
const maxAge = 3 * 24 * 60 * 60;
const worker = require('./../models/AddWorker')

const createToken = (id) => {
  return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const handleErr = (err) => {
  let errors = {
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
  };

  if (err.message === "Invalid Credentials") {
    errors.email = "Invalid Credentials";
    errors.password = "Invalid Credentials";
  }

  if (err.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }

  if (err.message.includes("registerWorker validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

exports.registerWorker = async (req, res) => {
  const {
    firstName,
    lastName,
    gender,
    workerID,
    email,
    password,
    country,
    city,
    companyName,
    companyID,
  } = req.body;
  try {
    const worker = await Worker.create({
      firstName,
      lastName,
      gender,
      workerID,
      email,
      password,
      country,
      city,
      companyName,
      companyID,
    });
    client.findOne({companyName}, (err,sources)=>{
      if (err){throw err}
      worker.updateOne({companyID : sources._id}, (err)=>{
        if (err) throw err}
    )})
    const token = createToken(worker._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).redirect('/worker_login');
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
    res.status(200).redirect("/worker_home");
  } catch (err) {
    const errors = handleErr(err);
    res.status(400).json({ errors });
  }
};
