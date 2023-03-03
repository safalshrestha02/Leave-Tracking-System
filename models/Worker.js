const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const registerWorker = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "*please enter your last name"],
    },
    lastName: {
      type: String,
      required: [true, "*please enter your last name"],
    },
    country: {
      type: String,
      required: [true, "*please enter your country"],
    },
    city: {
      type: String,
      required: [true, "*please enter your city"],
    },
    companyName: {
      type: String,
      required: [true, "*please enter your company name"],
    },
    workerID: {
      type: String,
      require: [true, "*please enter worker ID"],
      minlength: [11, "*please enter 5 digit ID"],
    },
    gender: {
      type: String,
      require: [true, "*Select your gender"],
      enum: ["male", "female", "others"],
    },
    email: {
      type: String,
      required: [true, "*please enter your email"],
      validate: [isEmail, "*please enter a valid email"],
      unique: [true, "*please enter unique email"],
    },
    password: {
      type: String,
      required: [true, "*please enter a password"],
      minlength: [8, "*minimum password length is 8 characters"],
    },
    updatedAt: {
      type: Date,
      required: false,
      default: null,
    },
    leavesYearly: { type: Number, default: 30 },
    companyDetail: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "client" },
      clientID: Number,
      companyName: String,
      companyID: Number,
      companyAddress: String,
    },
    leavesYearly: Number,
  },
  { timestamps: true }
);

registerWorker.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

registerWorker.statics.registerWorker = async function (
  workerName,
  country,
  city,
  companyName,
  workerID,
  gender,
  email,
  password,
  companyDetail,
  leavesYearly
) {
  const dupWorkerId = await this.findOne({ workerID });

  if (dupWorkerId) {
    throw Error("*worker is already registered");
  }

  const dupEmail = await this.findOne({ email });

  if (dupEmail) {
    throw Error("*email is already registered");
  }

  const worker = await this.create({
    workerName,
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
  return worker;
};

registerWorker.statics.login = async function (workerID, password) {
  const worker = await this.findOne({ workerID });
  if (worker) {
    const passcheck = await bcrypt.compare(password, worker.password);
    if (passcheck) {
      return worker;
    }
    throw Error("Invalid Credentials");
  }
  throw Error("Invalid Credentials");
};

registerWorker.methods.checkPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("worker", registerWorker);
