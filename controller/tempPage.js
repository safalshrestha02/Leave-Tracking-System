const Clients = require("../models/ClientRegistration");
const worker = require("../models/AddWorker");
const messages = require("./../models/RequestForLeave");

exports.apiClient = (req, res, next) => {
  Clients.find().then((result) => {
    res.send(result);
  });
};
exports.apiMessages = (req, res, next) => {
  messages.find().then((result) => {
    res.send(result);
  });
};

exports.apiWorkers = async (req, res, next) => {
  const Cworker = await worker.find({});
  res.json(Cworker);
};

exports.ClientbyId = async (req, res) => {
  console.log(req.params["id"]);
  Clients.findById(req.params["id"]).then((result) => {
    res.json(result);
  });
};

exports.WorkerbyId = async (req, res) => {
  console.log(req.params["id"]);
  worker.findById(req.params["id"]).then((result) => {
    res.json(result);
  });
};
exports.LeavebyId = async (req, res) => {
  console.log(req.params["id"]);
  messages.findById(req.params["id"]).then((result) => {
    res.json(result);
  });
};

exports.workerDelete = async (req, res, next) => {
  const { id } = req.params;
  const deleteallworkerleaves = await messages.deleteMany({
    "workerDetails._id": id,
  });
  const workerDelete = await worker.findOneAndDelete(id);
};

exports.leaveRequestDelete = async (req, res, next) => {
  const { id } = req.params;
  const deleting = await messages.findOneAndDelete(id);
};
