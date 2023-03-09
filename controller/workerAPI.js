const Leaves = require("../models/Leave");
const Worker = require('../models/Worker')

exports.leaveRequestDelete = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Leaves.findByIdAndDelete(id);
    res.status(201).json({ "successfully Deleted": id });
  } catch (error) {
    next(error);
  }
};

exports.workersLeaves = async (req, res, next) => {
  const { page = 1, limit = 1000 } = req.query;
  const count = await Leaves.count();
  const { id } = req.params;

  try {
    await Leaves.find({ "workerDetails._id": id })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .then((leaves) => {
        if (leaves) {
          res.status(201).json({
            leaveHistory: leaves,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
          });
        } else {
          res.status(400).json({ error: "No worker under that ID" });
        }
      });
  } catch (error) {
    next(error);
  }
};

exports.expireUnapproved = async (req,res)=>{
  try {
    let i = 0;
    let workerID;

    let currentDate = new Date();

    const id = req.params["id"];
    await Worker.findById(id).then((result) => {
      workerID = result.workerID;
    });
    await Leaves.find({
      "workerDetails.workerID": workerID,
    }).then((result) => {
      console.log(result)
      result.forEach(async () => {
        if (result[i].endDate < currentDate && result[i].approveState == "pending") {
          await Leaves.findByIdAndUpdate(result[i]._id, {
            $set: { approveState: "rejected" },
          });
        }
        i += 1;
      });
      res
        .status(201)
        .json({ updated: "all dates and leave Requests are updated" });
    });
  } catch (error) {
    res.status(400);
    throw error;
  }
}