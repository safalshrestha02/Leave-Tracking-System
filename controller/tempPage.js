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
    // .populate ( ClientRegistration,{ path: "companyN", model: "client" });
  res.json(Cworker);

  // res.send(result);
};

exports.ClientbyId = async(req, res)=>{
  console.log(req.params["id"])
  // const id = toID(req.params["id"])
  Clients.findById(req.params['id']).then((result)=>{
    res.json(result)
  })
}

exports.WorkerbyId = async(req, res)=>{
  console.log(req.params["id"])
  // const id = toID(req.params["id"])
  worker.findById(req.params['id']).then((result)=>{
    res.json(result)
  })
}
exports.LeavebyId = async(req, res)=>{
  console.log(req.params["id"])
  // const id = toID(req.params["id"])
  messages.findById(req.params['id']).then((result)=>{
    res.json(result)
  })
}
