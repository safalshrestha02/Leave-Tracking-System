const Clients = require("../models/ClientRegistration");
const worker = require("../models/AddWorker");
const messages = require("./../models/RequestForLeave");
const mongoose = require("mongoose");
const toID = mongoose.Schema.Types.ObjectId;

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
  // worker.find().then(async (result) =>  {
  const Cworker = await worker
    .find({})
    .populate({ path: "companyN", model: "client" });
  console.log(Cworker.companyN);
  res.json(Cworker);
  // res.send(result);
};
// };
