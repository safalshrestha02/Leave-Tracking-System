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
  console.log(req.params["id"]);
  Worker.findById(req.params["id"]).then((result) => {
    res.json(result);
  });
};
exports.LeavebyId = async (req, res) => {
  console.log(req.params["id"]);
  Messages.findById(req.params["id"]).then((result) => {
    res.json(result);
  });
};

exports.workerDelete = async (req, res, next) => {
  const { id } = req.params;
  const deleteallworkerleaves = await Messages.deleteMany({
    "workerDetails._id": id,
  });
  const workerDelete = await Worker.findOneAndDelete(id);
};

exports.leaveRequestDelete = async (req, res, next) => {
  const { id } = req.params;
  const deleting = await Messages.findOneAndDelete(id);
};
