const Leaves = require("../models/Leave");

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
