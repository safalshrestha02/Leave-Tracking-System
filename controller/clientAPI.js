const Clients = require("../models/Client");
const Worker = require("../models/Worker");
const Messages = require("../models/Leave");

exports.workerDelete = async (req, res, next) => {
  const { id } = req.params;

  try {
    await Messages.deleteMany({
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
  const { page = 1, limit = 10 } = req.query;
  const count = await Worker.count();
  const { id } = req.params;

  try {
    await Clients.findById(id).then((result) => {
      if (result) {
        Worker.find({ "companyDetail._id": id })
          .limit(limit * 1)
          .skip((page - 1) * limit)
          .then((workers) => {
            if (workers) {
              res.status(201).json({
                workers: workers,
                totalPages: Math.ceil(count / limit),
                currentPage: page,
              });
            } else {
              res.status(400).json({ error: "No worker under that Client" });
            }
          });
      } else {
        res.status(400).json({ error: "No client under that ID" });
      }
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.clientsWorkersLeaves = async (req, res, next) => {
  const { page = 1, limit = 1000 } = req.query;
  const count = await Messages.count();
  const { id } = req.params;

  try {
    Clients.findById(id).then((specificClient) => {
      if (specificClient) {
        const company = specificClient.companyName;
        Worker.find({
          "companyDetail._id": id,
          "companyDetail.companyName": company,
        }).then((result) => {
          if (result) {
            Messages.find({
              "workerDetails.companyDetail.companyName": company,
            })
              .limit(limit * 1)
              .skip((page - 1) * limit)
              .then((allLeaves) => {
                res.status(201).json({
                  Leaves: allLeaves,
                  totalPages: Math.ceil(count / limit),
                  currentPage: page,
                });
              });
          } else {
            res.status(201).json({ error: "No Workers for the Client" });
          }
        });
      } else {
        res.status(400).json({ Error: "No client found with that ID" });
      }
    });
  } catch (error) {
    res.json({ error: error });
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
    res.status(400).json(error.message);
    console.error(error);
  }
};
