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
  Clients.findById(req.params["id"]).then((result) => {
    res.json(result);
  });
};

exports.WorkerbyId = async (req, res) => {
  worker.findById(req.params["id"]).then((result) => {
    res.json(result);
  });
};
exports.LeavebyId = async (req, res) => {
  messages.findById(req.params["id"]).then((result) => {
    res.json(result);
  });
};

exports.workerDelete = async (req, res, next) => {
  const { id } = req.params;
  const deleteallworkerleaves = await messages.deleteMany({
    approveState: "pending",
    "workerDetails._id": id,
  });
  const workerDelete = await worker.findOneAndDelete(id);
  res.send("<h3>worker along with his leave requests are deleted</h3>");
};

exports.leaveRequestDelete = async (req, res, next) => {
  const { id } = req.params;
  const deleting = await messages.findOneAndDelete(id);
  res.send("<h3>leave request is deleted</h3>");
};
