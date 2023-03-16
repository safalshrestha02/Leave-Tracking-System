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
          res.status(400).json({ error: "No worker under that ID" });
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
    mm = new Date().getMonth() + 1;
    dd = new Date().getDate();
    yyyy = new Date().getFullYear();

    if (dd < 10) dd = "0" + dd;
    if (mm < 10) mm = "0" + mm;

    const currentDate = `${yyyy}-${mm}-${dd}`;
    const parsedCurrentDate = Date.parse(currentDate);

    let currentDateValue = Date.parse(currentDate);

    const id = req.params["id"];
    await Worker.findById(id).then((result) => {
      workerID = result.workerID;
    });
    const allLeaves = await Leaves.find({ "workerDetails.workerID": workerID });
    allLeaves.forEach(async () => {
      i += 1;
      let dataYear = allLeaves[i].endDate.getFullYear();
      let dataMonth = allLeaves[i].endDate.getMonth()+1;
      let dataDay = allLeaves[i].endDate.getDate();

      if (dataDay < 10) dataDay = "0" + dataDay;
      if (dataMonth < 10) dataMonth = "0" + dataMonth;

      let finalDate = `${dataYear}-${dataMonth}-${dataDay}`
      const parsedFinalDate = Date.parse(finalDate)
      if (
        parsedFinalDate < parsedCurrentDate &&
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
      .json({ updated: "all dates and leave Requests are updated" });
  } catch (error) {
    res.status(400);
    throw error;
  }
};
