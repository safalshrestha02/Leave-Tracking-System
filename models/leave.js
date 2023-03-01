const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    workerName: {
      type: String,
      required: [true, "*employee name is required"],
    },
    workerID: {
      type: String,
      required: [true, "*employee ID is required"],
    },
    startDate: {
      type: Date,
      required: [true, "*start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "*end Date is required"],
    },
    typeOfLeave: {
      type: String,
      required: [true, "*specifying type of leave is required"],
    },
    leaveDays: {
      type: Number,
      required: [true, "*total leave days is required"],
    },
    reason: {
      type: String,
      maxLength: [150, "*message must be maximum of 150 character"],
      required: [true, "*please specify a reson for your leave"],
    },
    approveState: {
      type: String,
      state: { type: String, default: "pending" },
      enum: ["pending", "approved", "rejeceted"],
    },
    workerDetails: {
      _id: { type: mongoose.Schema.Types.ObjectID, ref: "worker" },
      workerID: String,
      companyName: String,
      companyDetail: Object,
    },
    leavesYearly: { type : Number, default : 30 },
  },
  { timestamps: true }
);

const someComment = mongoose.model("leaveRequest", messageSchema);
module.exports = someComment;
