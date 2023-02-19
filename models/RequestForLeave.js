const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: [true, "employee name is required"],
  },
  employeeID: {
    type: [Number],
    required: [true, "employee ID is required"],
  },
  startDate: {
    type: Date,
    required: [true, "Start date is required"],
  },
  endDate: {
    type: [Date, "date should be date"],
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
    maxLength: [150, "message must be maximum of 150 character"],
    required: [true, "Please specify a reson for your leave"],
  },
  approvestate: {
    type: String,
    state: [{ type: String, default: "pending" }],
    enum: ["pending", "approved", "denied"],
  },
  workerID: {
    type: mongoose.Schema.Types.Object,
    ref: "worker",
  },
  workerN: {
    type: mongoose.Schema.Types.Object,
    ref: "worker",
  },
  timestamp: {},
});

const someComment = mongoose.model("leaveRequest", messageSchema);
module.exports = someComment;
