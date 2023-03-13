const Clients = require("../models/Client");
const Worker = require("../models/Worker");
const Leaves = require("../models/Leave");

exports.workerDelete = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Leaves.deleteMany({
      approveState: "pending",
      "workerDetails._id": id,
    });
    await Worker.findByIdAndDelete(id);
    res.status(201).json({ "successfully Deleted": id });
  } catch (error) {
    res.json({ error });
  }
};

exports.clientsWorkers = async (req, res, next) => {
  const { id } = req.params;
  const { search, page, limit } = req.query;
  let sort = req.query.sort || "firstName";

  try {
    let query = { "companyDetail._id": id };
    const searchRegex = new RegExp(search, "i");
    if (search) {
      query.$or = [
        { firstName: searchRegex },
        { lastName: searchRegex },
        { workerID: searchRegex },
      ];
    }

    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);
    let sortBy = {};
    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    const count = await Worker.find(query).count();

    await Worker.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort(sortBy)
      .then((workers) => {
        if (workers) {
          res.status(201).json({
            workers: workers,
            found: workers.length,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
          });
        } else {
          res.status(400).json({ error: "No worker under that Client" });
        }
      });
  } catch (error) {
    next(error);
  }
};

exports.clientsWorkersLeaves = async (req, res, next) => {
  const { id } = req.params;
  const { search, page, limit } = req.query;
  try {
    const specificClient = await Clients.findById(id);

    if (!specificClient) {
      res.status(400).json({ error: "No client found with that ID" });
    }
    const company = specificClient._id;

    let query = { "workerDetails.companyDetail._id": company };
    const searchRegex = new RegExp(search, "i");
    if (search) {
      query.$or = [
        { workerName: searchRegex },
        //{ lastName: searchRegex },
        { workerID: searchRegex },
      ];
    }

    const allLeaves = await Leaves.find(query);
    if (allLeaves) {
      res.status(201).json({
        Leaves: allLeaves,
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.suggestedIds = async (req, res, next) => {
  let workerIds = [];
  let dataLength = 0;
  let randomIds = [];

  try {
    await Clients.findOne({
      companyID: req.params.id,
    }).then(async (result) => {
      if (result) {
        await Worker.find({
          "companyDetail.companyID": result.companyID,
        }).then((res) => {
          res.forEach((data) => {
            workerIds[dataLength] = data.workerID;
            dataLength += 1;
          });
        });
        res.status(201);
      } else {
        res.status(400).json({ error: "No company found with that ID" });
      }
    });

    const generateRandomIds = () => {
      for (let i = 0; i < 3; i++) {
        let number = Math.floor(Math.random() * 99999);
        const padNumber = number.toString().padStart(5, "0");
        randomIds[i] = padNumber;
      }
      return randomIds;
    };

    const checkIds = async (workerIds, randomIds) => {
      generateRandomIds();
      let a = 0;
      workerIds.forEach(function () {
        if (randomIds.includes(workerIds[a])) {
          generateRandomIds();
        }
        a += 1;
      });
      res.status(201).json(randomIds);
    };

    checkIds(workerIds, randomIds);
  } catch (error) {
    next(error);
  }
};

exports.expireUnapproved = async (req, res) => {
  try {
    let i = -1;
    let companyName;
    const change = { approveState: "rejected" };
    let currentDate = new Date();

    const id = req.params["id"];
    await Clients.findById(id).then((result) => {
      companyName = result.companyName;
    });
    const allLeaves = await Leaves.find({
      "workerDetails.companyDetail.companyName": companyName,
    });
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
      .json({ updated: "all dates and leave Requests are updated" });
  } catch (error) {
    res.status(400);
    throw error.message;
  }
};
