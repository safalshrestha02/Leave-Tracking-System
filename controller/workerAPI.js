const Leaves = require("../models/Leave");
const Worker = require("../models/Worker");

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
  let { approveState } = req.query;

  if (!approveState) {
    approveState = "all";
  }

  try {
    const states = ["approved", "pending", "rejected"];
    approveState === "all"
      ? (approveState = [...states])
      : (approveState = req.query.approveState.split(","));

    await Leaves.find({ "workerDetails._id": id })
      .where("approveState")
      .in([...approveState])
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
          res
            .status(400)
            .setHeader("Content-Security-Policy", "script-src 'self'")
            .json({ error: "No worker under that ID" });
        }
      });
  } catch (error) {
    next(error);
  }
};

exports.expireUnapproved = async (req, res) => {
  try {
    let i = -1;
    let workerID;
    const change = { approveState: "rejected" };
    let currentDate = new Date();

    const id = req.params["id"];
    await Worker.findById(id).then((result) => {
      workerID = result.workerID;
    });
    const allLeaves = await Leaves.find({ "workerDetails.workerID": workerID });
    allLeaves.forEach(async () => {
      i += 1;
      if (
        allLeaves[i].endDate < currentDate &&
        allLeaves[i].approveState === "pending"
      ) {
        await Leaves.findByIdAndUpdate(
          allLeaves[i]._id,
          { $set: change },
          { new: true }
        );
      }
    });
    res
      .status(201)
      .setHeader("Content-Security-Policy", "script-src 'self'")
      .json({ updated: "all dates and leave Requests are updated" });
  } catch (error) {
    res.status(400);
    throw error;
  }
};
