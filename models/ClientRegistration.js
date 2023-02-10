const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const clientSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: [true, "company name is required"],
      unique: [true, "company is already taken"],
    },
    companyAddress: {
      type: String,
      required: [true, "company address is required"],
    },
    name: {
      type: String,
      required: [true, "username is required"],
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      lowercase: true,
      validate: [isEmail, "please enter a valid email"],
      unique: [true, "Please enter unique email"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minlength: [8, "minimum 8 words required"],
    },
  },
  { timestamps: {} }
);

clientSchema.pre("save", async function (next) {
  console.log("Please wait we are registering you...");
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

clientSchema.post("save", async function (next) {
  console.log("you have been registered");
});

clientSchema.statics.login = async function (email, password, companyName) {
  const client = await this.findOne({ email, companyName });
  if (client) {
    const passcheck = await bcrypt.compare(password, client.password);
    if (passcheck) {
      console.log("loggedin");
      return client;
    }
    throw Error("Invalid Credentials");
  }
  throw Error("Invalid Credentials");
};

module.exports = mongoose.model("registerClient", clientSchema);
