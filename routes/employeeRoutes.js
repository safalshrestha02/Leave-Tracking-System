const express = require("express");
const router = express.Router();

const workerRegistration = require("../controller/workerAuth");

router.post("/", workerRegistration.registerWorker);

module.exports = router;
