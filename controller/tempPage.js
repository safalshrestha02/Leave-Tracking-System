const Clients = require("../models/ClientRegistration");
const Worker = require("../models/AddWorker");
const Messages = require("./../models/RequestForLeave");

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

exports.ClientbyId = async (req, res) => {
  try {
    Clients.findById(req.params["id"]).then((result) => {
      res.json(result);
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.WorkerbyId = async (req, res) => {
  try {
    Worker.findById(req.params["id"]).then((result) => {
      res.json(result);
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.LeavebyId = async (req, res) => {
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
    const client = await Clients.findById(id).then((specificClient) => {
      const worker = Worker.find({ "companyDetail._id": id }).then(
        (workersClient) => {
          const leave = Messages.find({
            "workerDetails.CompanyDetail._id": id,
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
        }
      );
    });
  } catch (error) {
    res.json({ error });
  }
};
