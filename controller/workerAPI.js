const Worker = require("../models/Worker");
const Messages = require("../models/Leave");

exports.leaveRequestDelete = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleting = await Messages.findByIdAndDelete(id);
    res.status(201).json({ "successfully Deleted": id });
  } catch (error) {
    res.json({ error });
  }
};

exports.workersLeaves = async (req, res, next) => {
  const { page = 1, limit = 1000 } = req.query;
  const count = await Messages.count();
  const { id } = req.params;

  try {
    const worker = await Worker.findById(id).then((result) => {
      if (result) {
        const leave = Messages.find({ "workerDetails._id": id })
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .then((leaves) => {
            if (leaves) {
              res.status(201).json({
                worker: result,
                leaveHistory: leaves,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
              });
            } else {
              res
                .status(400)
                .json({ error: "No leave requests from that Worker" });
            }
          });
      } else {
        res.status(400).json({ error: "No worker under that ID" });
      }
    });
  } catch (error) {
    res.json({ error });
  }
};
