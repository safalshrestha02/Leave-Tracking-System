const crypto = require("crypto");
const Client = require("../models/Client");
const Leave = require("../models/Leave");
const Worker = require("../models/Worker");
const { workerErrHandle } = require("../utils/errorHandler");
const { createWorkerToken } = require("../utils/createToken");
const sendEmail = require("../utils/sendMail");

const maxAge = 2 * 24 * 60 * 60;

exports.registerWorker = async (req, res, next) => {
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
    const dupEmail = await Worker.findOne({ email, companyName });
    if (companyDetail) {
      if (!dupEmail || dupEmail === []) {
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
      } else if (dupEmail) {
        throw new Error ("email is taken")
      }
    }
  } catch (error) {
    const errors = workerErrHandle(error);
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
  } catch (error) {
    const errors = workerErrHandle(error);
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
    if (workerDetails) {
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
    } else {
      res.status(400).json({ error: "could not find worker" });
    }
  } catch (error) {
    next(error);
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
    }

    worker.password = newPassword;
    worker.updatedAt = Date.now();
    await worker.save().then(() => {
      res.status(201).clearCookie("jwt").json({ message: "Password Changed" });
    });
  } catch (error) {
    const errors = workerErrHandle(error);
    res.status(400).json({ errors });
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const worker = await Worker.findOne({ email: req.body.email });

    if (!worker) {
      return res
        .status(404)
        .json({ message: "Sorry! There is no user with that email" });
    }

    const resetToken = worker.getResetPasswordToken();

    await worker.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.WORKER_DOMAIN}/?token=${resetToken}`;

    console.log(resetUrl);

    const message = `You are reveiving this email because you (or someone else) has requested to resest the passord. Please click the link below to reset your password \n\n ${resetUrl} \n\n This link will expire in 10 minutes`;

    try {
      await sendEmail({
        from: process.env.FROM_EMAIL,
        email: worker.email,
        subject: "Password reset token",
        message,
      });

      res.status(200).json({ success: true, data: "Email sent" });
    } catch (error) {
      console.log(error);
      worker.resetPasswordToken = undefined;
      worker.resetPasswordExpire = undefined;

      await worker.save({ validateBeforeSave: false });

      return res
        .status(404)
        .json({ message: "Sorry! There is no user with that email" });
    }
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    //get hashed token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resetToken)
      .digest("hex");

    const worker = await Worker.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!worker) {
      return res.status(400).json({ message: "Invalid Token" });
    }
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;

    if (newPassword != confirmPassword) {
      return res.json({ message: "Passwords don't match" });
    }
    worker.password = req.body.confirmPassword;
    worker.resetPasswordToken = undefined;
    worker.resetPasswordExpire = undefined;

    await worker.save().then(() => {
      res.status(201).json({ message: "Password Changed" });
    });
  } catch (error) {
    const errors = workerErrHandle(error);
    res.status(400).json({ errors });
  }
};
