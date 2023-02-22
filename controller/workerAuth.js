const jwt = require("jsonwebtoken");
const client = require("./../models/ClientRegistration");
const leave = require("./../models/RequestForLeave");
const Worker = require("../models/AddWorker");
const { populate } = require("./../models/RequestForLeave");

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, process.env.WORKER_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const handleErr = (err) => {
  let errors = {
    email: "",
    password: "",
    workerID: "",
  };
  if (err.message === "Invalid Credentials") {
    errors.workerID = "*Invalid Credentials";
    errors.password = "*Invalid Credentials";
  }
  if (err.code === 11000) {
    if (err.message.includes("workerID")) {
      errors.workerID = "*this workerID already registered";
    }
    if (err.message.includes("email")) {
      errors.email = "*that email is already registered";
    }
    return errors;
  }
  if (err.message.includes("worker validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
  // console.log(err.message, err.code);
};

exports.registerWorker = async (req, res) => {
  const {
    firstName,
    lastName,
    country,
    city,
    companyName,
    workerID,
    gender,
    email,
    password,
    companyDetail,
  } = req.body;
  try {
    const companyDetail = await client.findOne({ companyName });
    const worker = await Worker.create({
      firstName,
      lastName,
      country,
      city,
      companyName,
      workerID,
      gender,
      email,
      password,
      companyDetail,
    });

    const token = createToken(worker._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ message: "registered" });
  } catch (err) {
    const errors = handleErr(err);
    res.status(401).json({ errors });
  }
};

exports.login = async (req, res, next) => {
  const { workerID, password } = req.body;
  try {
    const worker = await Worker.login(workerID, password);
    const token = createToken(worker._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ message: `${workerID} is logged in` });
  } catch (err) {
    const errors = handleErr(err);
    res.status(400).json({ errors });
  }
};

exports.applyLeave = async (req, res, next) => {
  const {
    employeeName,
    employeeID,
    startDate,
    endDate,
    typeOfLeave,
    leaveDays,
    reason,
    approveState,
    workerDetails,
  } = req.body;
  try {
    const workerDetail = await Worker.findOne({ workerID: employeeID });
    leaveRequest = await leave.create({
      employeeName,
      employeeID,
      startDate,
      endDate,
      typeOfLeave,
      leaveDays,
      reason,
      approveState,
      workerDetails: workerDetail,
    });
    res.status(201).json({ success: true });
  } catch (err) {
    console.log(err.message);
  }
};
