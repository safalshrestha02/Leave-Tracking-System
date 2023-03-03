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
    const deleting = await Messages.findOneAndDelete({
      _id: id,
      approveState: "pending",
    });
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
      const worker = Worker.find({ "companyDetail._id": id })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .then((workers) => {
          res.status(201).json({
            workers: workers,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
          });
        });
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.workersLeaves = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;
  const count = await Messages.count();
  const { id } = req.params;

  try {
    const worker = await Worker.findById(id).then((result) => {
      const leave = Messages.find({ "workerDetails._id": id })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .then((leaves) => {
          res.status(201).json({
            worker: result,
            leaveHistory: leaves,
            totalPages: Math.ceil(count / limit),
            currentPage: page,
          });
        });
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
      const company = specificClient.companyName;
      Worker.find({
        "companyDetail._id": id,
        "companyDetail.companyName": company,
      }).then((result) => {
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
      });
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
      return result.companyID;
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
        randomIds[i] = `${clientId}-${padNumber}`;
      }
      return randomIds;
    };

    generateRandomIds();

    const checkIds = async (workerIds, randomIds) => {
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
  } catch (err) {
    res.status(400).json(err.message);
    console.log(err);
  }
};
