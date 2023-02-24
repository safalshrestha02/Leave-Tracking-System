const Client = require("./../models/ClientRegistration");
const Leave = require("./../models/RequestForLeave");
const Worker = require("../models/AddWorker");
const { workerErrHandle } = require("../utils/errorHandler");
const { createWorkerToken } = require("../utils/createToken");

const maxAge = 2 * 24 * 60 * 60;

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
    const companyDetail = await Client.findOne({ companyName });
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
    res.status(201).json({ message: "registered" });
  } catch (err) {
    const errors = workerErrHandle(err);
    res.status(401).json({ errors });
  }
};

exports.login = async (req, res, next) => {
  const { workerID, password } = req.body;
  try {
    const worker = await Worker.login(workerID, password);
    const token = createWorkerToken(worker._id);
    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ message: `${workerID} is logged in` });
  } catch (err) {
    const errors = workerErrHandle(err);
    res.status(400).json({ errors });
  }
};

exports.applyLeave = async (req, res, next) => {
  const {
    workerName,
    workerID,
    startDate,
    endDate,
    typeOfLeave,
    leaveDays,
    reason,
    approveState,
    workerDetails,
  } = req.body;
  try {
    const workerDetail = await Worker.findOne({ workerID: workerID });
    leaveRequest = await Leave.create({
      workerName,
      workerID,
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

exports.activeWorker = async (req, res, next) => {
  try {
    const worker = await Worker.findById(req.worker.id).select(
      "companyDetail firstName lastName country city companyName workerID gender email createdAt"
    );
    res.status(200).json({ data: worker });
  } catch (error) {
    next(error);
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.cookie("jwt", " ", {
      expiresIn: { maxAge: 1 },
      httpOnly: true,
    });
    res.status(200).redirect("/");
  } catch (error) {
    next(error);
  }
};
