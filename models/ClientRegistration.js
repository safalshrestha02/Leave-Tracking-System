const mongoose = require("mongoose");
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
      required : [true, "*company ID is required" ],
      minlength: [6, "*please enter 6 digit ID"],
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
  },
  { timestamps: true });

clientSchema.pre("save", async function (next) {
  console.log("Please wait we are registering you...");
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
  password
) {
  const dupCompName = await this.findOne({ companyName });

  if (dupCompName) {
    throw Error("*company is already registered");
  }

  const dupEmail = await this.findOne({ email });

  if (dupEmail) {
    throw Error("*email is already registered");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const client = await this.create({
    clientID,
    companyName,
    companyID,
    companyAddress,
    name,
    email,
    password: hashedPassword,
  });
  return client;
};

clientSchema.statics.login = async function (email, password) {
  const client = await this.findOne({ email });
  if (client) {
    const passcheck = await bcrypt.compare(password, client.password);
    if (passcheck) {
      console.log("logged in");
      return client;
    }
    throw Error("Invalid Credentials");
  }
  throw Error("Invalid Credentials");
};

module.exports = mongoose.model("client", clientSchema);
