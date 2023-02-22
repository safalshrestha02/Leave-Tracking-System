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
  const Cworker = await worker
    .find({})
  res.json(Cworker);
}

exports.ClientbyId = async(req, res)=>{
  console.log(req.params["id"])
  Clients.findById(req.params['id']).then((result)=>{
    res.json(result)
  })
}

exports.WorkerbyId = async(req, res)=>{
  console.log(req.params["id"])
  worker.findById(req.params['id']).then((result)=>{
    res.json(result)
  })
}
exports.LeavebyId = async(req, res)=>{
  console.log(req.params["id"])
  messages.findById(req.params['id']).then((result)=>{
    res.json(result)
  })
}
