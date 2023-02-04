const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema(
  {
    employeeName: {
      type: string,
      required: [true, "company name is required"],
    },
    employeeId: {
      type: string,
      required: [true, "company address is required"],
    },
    startDate: {
      type: string,
      require: [true, "username is required"],
      lowercase: true,
    },
    leaveType: {
      type: string,
      require: [true],
      enum: ["pending", "approved", "denied"],
    },
    leaveDescription: {
      type: string,
      require: [true, "Give a description for your leave"],
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
