const jwt = require("jsonwebtoken");
const client = require("./../models/ClientRegistration");
const maxAge = 3 * 24 * 60 * 60;
const leave = require("./../models/RequestForLeave");
const worker = require("./../models/AddWorker");
const { populate } = require("./../models/RequestForLeave");

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
    country,
    city,
    companyName,
    workerID,
    gender,
    email,
    password,
    companyN,
    companyI,
  } = req.body;
  try {
    const Worker = await worker.create({
      firstName,
      lastName,
      country,
      city,
      companyName,
      workerID,
      gender,
      email,
      password,
      companyN,
      companyI,
    });
    client.findOne({ companyName }, (err, sources) => {
      if (err) {
        throw err;
      }
      Worker.update({ companyN: sources.companyName, companyI : sources._id }, (err) => {
        if (err) throw err;
      });
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
  const { email, password } = req.body;
  try {
    const client = await Client.login(email, password);
    const token = createToken(client._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ message: "logged in" });
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
    workerID,
    workerN
  } = req.body;
  try {
    leaveRequest = await leave.create({
      employeeName,
      employeeID,
      startDate,
      endDate,
      typeOfLeave,
      leaveDays,
      reason,
      approveState,
      workerID,
      workerN
    });
    worker.findOne({ employeeID }, (err, sources) => {
      if (err) {
        throw err;
      }
      leaveRequest.update({ workerID: sources._id , workerN : sources.workerID}, (err) => {
        if (err) throw err;
      });
    });
    res.status(201).json({ success: true });
  } catch (err) {
    console.log(err.message);
  }
};
