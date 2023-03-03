const mongoose = require("mongoose");
const crypto = require("crypto");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const clientSchema = new mongoose.Schema(
  {
    clientID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "client",
    },
    companyName: {
      type: String,
      required: [true, "*company name is required"],
      unique: true,
    },
    companyID: {
      type: String,
      required: [true, "*company ID is required"],
      minlength: [5, "*please enter 5 digit ID"],
      unique: true,
    },
    companyAddress: {
      type: String,
      required: [true, "*company address is required"],
    },
    name: {
      type: String,
      required: [true, "*client name is required"],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "*email is required"],
      lowercase: true,
      validate: [isEmail, "*please enter a valid email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "*password is required"],
      minlength: [8, "*password must be 8 characters or above"],
    },
    leavesYearly: {
      type: Number,
      default: 60,
    },
    updatedAt: {
      type: Date,
      required: false,
      default: null,
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

clientSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

clientSchema.statics.registerClient = async function (
  clientID,
  companyName,
  companyID,
  companyAddress,
  name,
  email,
  password,
  leavesYearly
) {
  const dupCompName = await this.findOne({ companyName });

  if (dupCompName) {
    throw Error("*company is already registered");
  }

  const dupEmail = await this.findOne({ email });

  if (dupEmail) {
    throw Error("*email is already registered");
  }

  const client = await this.create({
    clientID,
    companyName,
    companyID,
    companyAddress,
    name,
    email,
    password,
    leavesYearly,
  });
  return client;
};

clientSchema.statics.login = async function (email, password) {
  const client = await this.findOne({ email });
  if (client) {
    const passcheck = await bcrypt.compare(password, client.password);
    if (passcheck) {
      return client;
    }
    throw Error("Invalid Credentials");
  }
  throw Error("Invalid Credentials");
};

clientSchema.methods.checkPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

clientSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(64).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("client", clientSchema);
