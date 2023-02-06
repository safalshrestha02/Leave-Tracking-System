const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const registerWorker = new mongoose.Schema(
  {
    firstName: {
      type: String,
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
    employeeEmail: {
      type: String,
      require: [true],
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minlength: [8, "Password must be 8 characters or above"],
    },
    // confirmPassword: {
    //   type: String,
    //   require: [true, "Give a description for your leave"],
    // },
  },
  { timestamps: {} }
);

module.exports = mongoose.model("registerWorker", registerWorker);
