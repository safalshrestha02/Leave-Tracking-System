require("dotenv").config();
const jwt = require("jsonwebtoken");

const createClientToken = (id) => {
  return jwt.sign({ id }, process.env.CLIENT_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

const createWorkerToken = (id) => {
  return jwt.sign({ id }, process.env.WORKER_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

module.exports = { createClientToken, createWorkerToken };
