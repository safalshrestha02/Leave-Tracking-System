const Clients = require("../models/Client");
const Worker = require("../models/Worker");
const Messages = require("../models/Leave");

exports.apiClient = (req, res, next) => {
  try {
    Clients.find().then((result) => {
      res.send(result);
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.apiMessages = (req, res, next) => {
  try {
    Messages.find().then((result) => {
      res.send(result);
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.apiWorkers = async (req, res, next) => {
  try {
    const Cworker = await Worker.find({});
    res.json(Cworker);
  } catch (error) {
    res.json({ error });
  }
};

exports.clientbyId = async (req, res) => {
  try {
    Clients.findById(req.params["id"]).then((result) => {
      res.json(result);
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.workerbyId = async (req, res) => {
  try {
    Worker.findById(req.params["id"]).then((result) => {
      res.json(result);
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.leavebyId = async (req, res) => {
  try {
    Messages.findById(req.params["id"]).then((result) => {
      res.json(result);
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.workerDelete = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleteallworkerleaves = await Messages.deleteMany({
      approveState: "pending",
      "workerDetails._id": id,
    });
    const workerDelete = await Worker.findByIdAndDelete(id);
    res.status(201).json({ "successfully Deleted": id });
  } catch (error) {
    res.json({ error });
  }
};

exports.leaveRequestDelete = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deleting = await Messages.findByIdAndDelete(id);
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
    const client = await Clients.findById(id).then((result) => {
      if (result) {
        const worker = Worker.find({ "companyDetail._id": id })
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
              res.status(400).json({ "error": "No worker under that Client" });
            }
          });
      } else {
        res.status(400).json({ "error": "No client under that ID" });
      }
    });
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

exports.clientsWorkersLeaves = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
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
    const clientId = await Clients.findOne({
      companyID: req.params.id,
    }).then((result) => {
      if (result) {
        return result.companyID;
        res.status(201);
      } else {
        res.status(400).json({ error: "No company found with that ID" });
      }
    });

    const workerId = await Worker.find({
      "companyDetail.companyID": clientId,
    }).then((result) => {
      result.forEach((data) => {
        workerIds[dataLength] = data.workerID;
        dataLength += 1;
      });
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
