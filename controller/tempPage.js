const Clients = require("../models/Client");
const Worker = require("../models/Worker");
const Messages = require("../models/Leave");

exports.apiClient = (req, res, next) => {
  try {
    Clients.find().then((result) => {
      if (result) {
        res.send(result);
      }
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.apiMessages = (req, res, next) => {
  try {
    Messages.find().then((result) => {
      if (result) {
        res.send(result);
      }
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.apiWorkers = async (req, res, next) => {
  try {
    await Worker.find({}).then((result) => {
      if (result) {
        res.send(result);
      }
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.clientbyId = async (req, res) => {
  try {
    Clients.findById(req.params["id"]).then((result) => {
      if (result) {
        res.json(result);
      }
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.workerbyId = async (req, res) => {
  try {
    Worker.findById(req.params["id"]).then((result) => {
      if (result) {
        res.json(result);
      }
    });
  } catch (error) {
    res.json({ error });
  }
};

exports.leavebyId = async (req, res) => {
  try {
    Messages.findById(req.params["id"]).then((result) => {
      if (result) {
        res.json(result);
      }
    });
  } catch (error) {
    res.json({ error });
  }
};