const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const registerWorker = new mongoose.Schema(
  {
    firstName: {
      type: String,
      ref: "ClientRegistration",
      required: [true, "Please enter your first name"],
    },
    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
    },
    gender: {
      type: String,
      require: [true, "Select your gender"],
      enum: ["Male", "Female", "Others"],
    },
    workerID: {
      type: Number,
      require: [true, "Please enter worker ID"],
      minlength: [4, "please enter 4 digit ID"],
      unique: [true, "Please enter unique ID"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: [isEmail, "Please enter a valid email"],
      unique: [true, "Please enter unique email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [8, "Minimum password length is 8 characters"],
    },
    country: {
      type: String,
      required: [true, "please enter your country"],
    },
    city: {
      type: String,
      required: [true, "please enter your city"],
    },
    companyName: {
      type: Schema.Types.ObjectId,
      ref: "registerclients",
    },
  },
  { timestamps: {} }
);

registerWorker.pre("save", async function (next) {
  console.log("Please wait we are registering you...");
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

registerWorker.statics.login = async function (email, password) {
  const worker = await this.findOne({ email });
  if (worker) {
    const passcheck = await bcrypt.compare(password, worker.password);
    if (passcheck) {
      console.log("loggedin");
      return worker;
    }
  }
  throw Error("Invalid Credentials");
};

module.exports = mongoose.model("registerWorker", registerWorker);
