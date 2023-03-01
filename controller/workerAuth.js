const Client = require("../models/Client");
const Leave = require("../models/Leave");
const Worker = require("../models/Worker");
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
    leavesYearly,
  } = req.body;
  try {
    const companyDetail = await Client.findOne({ companyName });
    const leavesYearly = companyDetail.leavesYearly;
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
      leavesYearly,
    });
    res.status(201).json({ worker: worker._id });
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
    res.status(200).json({ msg: "Logged in" });
  } catch (err) {
    const errors = workerErrHandle(err);
    res.status(400).json({ errors });
  }
};

exports.applyLeave = async (req, res, next) => {
  const {
    workerName,
    leaveDays,
    workerID,
    startDate,
    endDate,
    typeOfLeave,
    reason,
    approveState,
    workerDetails,
    leavesYearly,
  } = req.body;
  try {
    const workerDetails = await Worker.findOne({ workerID });
    leaveRequest = await Leave.create({
      workerName,
      leaveDays,
      workerID,
      startDate,
      endDate,
      typeOfLeave,
      reason,
      approveState,
      workerDetails,
      leavesYearly: workerDetails.leavesYearly,
    });
    res.status(201).json({ success: true });
  } catch (err) {
    console.log(err.message);
  }
};

exports.activeWorker = async (req, res, next) => {
  try {
    const worker = await Worker.findById(req.worker.id)
      .select(
        "companyDetail firstName lastName country city companyName workerID gender email createdAt"
      )
      .exec();
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

exports.changePassword = async (req, res, next) => {
  const worker = await Worker.findById(req.worker.id).select("password");
  const currentPassword = req.body.currentPassword;
  const newPassword = req.body.newPassword;
  const confirmPassword = req.body.confirmPassword;

  if (currentPassword === newPassword || currentPassword === confirmPassword) {
    return res.json({
      message: "Enter a new password other than your current password",
    });
  }

  if (newPassword != confirmPassword) {
    return res.json({ message: "Passwords don't match" });
  }

  const checkCurrentPwd = await worker.checkPassword(currentPassword);
  try {
    if (!checkCurrentPwd) {
      return res.json({ message: "Incorrect Password" });
    } else res.json({ message: "password changed" });

    worker.password = newPassword;
    worker.updatedAt = Date.now();
    await worker.save();
  } catch (error) {
    next(error);
  }
};
