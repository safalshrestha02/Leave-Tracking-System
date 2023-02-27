const Clients = require("../models/ClientRegistration");
const Worker = require("../models/AddWorker");
const Messages = require("./../models/RequestForLeave");

exports.apiClient = (req, res, next) => {
  Clients.find().then((result) => {
    res.send(result);
  });
};
exports.apiMessages = (req, res, next) => {
  Messages.find().then((result) => {
    res.send(result);
  });
};

exports.apiWorkers = async (req, res, next) => {
  const Cworker = await Worker.find({});
  res.json(Cworker);
};

exports.ClientbyId = async (req, res) => {
  Clients.findById(req.params["id"]).then((result) => {
    res.json(result);
  });
};

exports.WorkerbyId = async (req, res) => {
  Worker.findById(req.params["id"]).then((result) => {
    res.json(result);
  });
};
exports.LeavebyId = async (req, res) => {
  Messages.findById(req.params["id"]).then((result) => {
    res.json(result);
  });
};

exports.workerDelete = async (req, res, next) => {
  const { id } = req.params;
  const deleteallworkerleaves = await Messages.deleteMany({
    approveState: "pending",
    "workerDetails._id": id,
  });
  const workerDelete = await Worker.findOneAndDelete(id);
  res.status(201).json({"successfully Deleted" : id})
};

exports.leaveRequestDelete = async (req, res, next) => {
  const id = req.params["id"];
  const deleting = await Messages.findOneAndDelete(id);
  res.status(201).json({"successfully Deleted" : id})
};

exports.clientsWorkers = async (req, res, next) => {
  const id = req.params["id"];
  const client = await Clients.findOne({ id }).then((result) => {
    const worker = Worker.find({ "companyDetail._id": id }).then((workers) => {
      res.status(201).json({ client: result, workers: workers });
    });
  });
};

exports.workersLeaves = async (req, res, next) => {
  const id = req.params["id"];
  const worker = await Worker.findOne({ id }).then((result) => {
    const leave = Messages.find({ "workerDetails._id": id }).then((leaves) => {
      res.status(201).json({ worker: result, leaveHistory: leaves });
    });
  });
};

exports.clientsWorkersLeaves = async (req, res, next) => {
  const id = req.params["id"];
  console.log(id);
  const client = await Clients.findById(id).then((specificClient) => {
    const worker = Worker.find({
      "companyDetails._id": id,
      companyName: specificClient.companyName,
    }).then((workersClient) => {
      const leave = Messages.find({
        "workerDetails.CompanyDetail._id": id,
        "workerDetails.companyName": specificClient.companyName,
      }).then((allLeaves) => {
        res.status(201).json({
          Client: specificClient,
          Workers: workersClient,
          Leaves: allLeaves,
        });
      });
    });
  });
};
