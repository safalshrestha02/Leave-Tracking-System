const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const registerWorker = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "*please enter your first name"],
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
    minlength: [4, "*please enter 4 digit ID"],
    unique: [true, "*please enter unique ID"],
  },
  gender: {
    type: String,
    require: [true, "*Select your gender"],
    enum: ["Male", "Female", "Others"],
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
  companyN: {
    type: mongoose.Schema.Types.Object,
    ref: "registerClient",
  },
  companyI:{
    type: mongoose.Schema.Types.Object,
    ref: "registerClient",
  },
  timestamps: {},
});

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
module.exports = mongoose.model("worker", registerWorker);
