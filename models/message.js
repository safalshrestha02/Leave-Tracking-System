const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  employeeName: {
    type: Schema.Types.ObjectID,
    ref: "worker",
    required: [true, "employee name is required"],
  },
  employeeID: {
    type: Number,
    required: [true, "employee ID is required"],
  },
  startDate: {
    type: Date,
    required: [true, "Start date is required"],
  },
  endDate: {
    type: Date,
    required: [true, "End Date is required"],
  },
  typeOfLeave: {
    type: String,
    required: [true, "Specifying type of leave is required"],
  },
  leaveDays: {
    type: Number,
    required: [true, "total leave days is required"],
  },
  reason: {
    type: String,
    maxLength: [200, "message must be maximum of 500 words"],
    required: [true, "Please specify a reson for your leave"],
  },
  approvestate: {
    state: [pending, approved, declined],
    default: pending,
  },
});

const someComment = mongoose.model("message", messageSchema);
module.exports = someComment;