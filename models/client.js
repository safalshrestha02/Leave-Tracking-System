const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const clientSchema = new mongoose.Schema(
  {
    CompanyName: {
      type: string,
      required: [true, "company name is required"],
    },
    CompanyAddress: {
      type: string,
      required: [true, "company address is required"],
    },
    Name: {
      type: string,
      require: [true, "username is required"],
      lowercase: true,
    },
    Email: {
      type: string,
      require: [true, "email is required"],
      lowercase: true,
      validate: { isEmail },
    },
    Gender: {
      type: string,
      require: [true, "gender is required"],
      lowercase: true,
    },
    Password: {
      type: string,
      require: [true, "password is required"],
      minlength: [8, "minimum 8 words required"],
    },
    approveState: {
      type: string,
      enum: ["pending", "approved", "denied"],
      default: "pending",
    },
  },
  { timestamps: {} }
);

clientSchema.pre("save", async function (next) {
  console.log("Client is being created");
  const salt = await bcrypt.genSalt();
  this.Password = await bcrypt.hash(this.Password, salt);
  next();
});

clientSchema.static.login = async function (Email, Password) {
  const client = await this.findOne({ Email });
  if (client) {
    const passcheck = await bcrypt.compare(Password, client.Password);
    if (passcheck) {
      return client;
    }
    throw Error("Invalid password");
  }
  throw Error("Invalid Email");
};

const someClient = mongoose.model("Client", clientSchema);
module.exports = someClient;
