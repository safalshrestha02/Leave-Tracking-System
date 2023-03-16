const Client = require("../models/Client");
const Leaves = require("../models/Leave");
const Worker = require("../models/Worker");
const crypto = require("crypto");
const { clientErrHandle } = require("../utils/errorHandler");
const { createClientToken } = require("../utils/createToken");
const sendEmail = require("../utils/sendMail");

const maxAge = 2 * 24 * 60 * 60;

exports.registerClient = async (req, res) => {
  const {
    clientID,
    companyName,
    companyID,
    companyAddress,
    name,
    email,
    password,
    leavesYearly,
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
      leavesYearly,
    });
    res.status(201).json({ client: client._id });
  } catch (error) {
    const errors = clientErrHandle(error);
    res.status(401).json({ errors });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const client = await Client.login(email, password);
    const token = createClientToken(client._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({ msg: "Logged in" });
  } catch (error) {
    const errors = clientErrHandle(error);
    res.status(400).json({ errors });
  }
};

exports.activeClient = async (req, res, next) => {
  try {
    const client = await Client.findById(req.client.id)
      .select(
        "companyName companyID companyAddress name email createdAt leavesYearly"
      )
      .exec();
    res.status(200).json({ data: client });
  } catch (error) {
    return error;
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

exports.changeLeaveState = async (req, res, next) => {
  const id = req.params["id"];
  const approveState = req.body.approveState;
  try {
    const change = await Leaves.findByIdAndUpdate(id, {
      $set: {
        approveState,
      },
    });
    res.status(201).json({success: `state has been changed to ${approveState}`});
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

exports.changeLeaveDays = async (req, res, next) => {
  const id = req.params["id"];
  const leavesYearly = req.body.leavesYearly;
  const workerFilter = { "companyDetail._id": id };
  const leaveFilter = { "workerDetails.companyDetail._id": id };

  try {
    await Client.findByIdAndUpdate(id, {
      $set: {
        leavesYearly,
      },
    });
    await Worker.updateMany(workerFilter, { $set: { leavesYearly } }).then(
      () => {
        Leaves.updateMany(leaveFilter, { $set: { leavesYearly } }).then(() => {
          res.status(201).json({ success: true });
        });
      }
    );
  } catch (error) {
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  const client = await Client.findById(req.client.id).select("password");
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

  const checkCurrentPwd = await client.checkPassword(currentPassword);
  try {
    if (!checkCurrentPwd) {
      return res.json({ message: "Incorrect Password" });
    }

    client.password = newPassword;
    client.updatedAt = Date.now();
    await client.save().then(() => {
      res.status(201).clearCookie("jwt").json({ message: "Password Changed " });
    });
  } catch (error) {
    const errors = clientErrHandle(error);
    res.status(401).json({ errors });
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const client = await Client.findOne({ email: req.body.email });

    if (!client) {
      return res
        .status(404)
        .json({ message: "Sorry! There is no user with that email" });
    }

    const resetToken = client.getResetPasswordToken();

    await client.save({ validateBeforeSave: false });

    const resetUrl = `${process.env.CLIENT_DOMAIN}/?token=${resetToken}`;

    console.log(resetUrl);

    const message = `You are reveiving this email because you (or someone else) has requested to resest the passord. Please click the link below to reset your password \n ${resetUrl} \n\nThis link will expire in 10 minutes`;

    try {
      await sendEmail({
        from: process.env.FROM_EMAIL,
        email: client.email,
        subject: "Password reset token",
        message,
      });

      res.status(200).json({ success: true, data: "Email sent" });
    } catch (error) {
      console.log(error);
      client.resetPasswordToken = undefined;
      client.resetPasswordExpire = undefined;

      await client.save({ validateBeforeSave: false });

      return res
        .status(500)
        .json({ message: "Sorry! There is no user with that email" });
    }
  } catch (error) {
    next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.params.resetToken)
      .digest("hex");

    const client = await Client.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!client) {
      return res.status(400).json({ message: "Invalid Token" });
    }
    const newPassword = req.body.newPassword;
    const confirmPassword = req.body.confirmPassword;

    if (newPassword != confirmPassword) {
      return res.json({ message: "Passwords don't match" });
    }

    client.password = req.body.confirmPassword;
    client.resetPasswordToken = undefined;
    client.resetPasswordExpire = undefined;

    await client.save().then(() => {
      res.status(201).json({ message: `Password Changed` });
    });
  } catch (error) {
    const errors = clientErrHandle(error);
    res.status(401).json({ errors });
  }
};
