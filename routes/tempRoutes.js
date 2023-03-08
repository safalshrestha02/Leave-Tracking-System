const express = require("express");
const router = express.Router();

//path
const temp = require("../controller/tempPage");

//html pages
router.get("/api/workers", temp.apiWorkers); //temp
router.get("/api/leaveRequests", temp.apiMessages); //temp
router.get("/api/clients", temp.apiClient); //temp

router.get("/api/clients/:id", temp.clientbyId); //temp
router.get("/api/workers/:id", temp.workerbyId); //temp
router.get("/api/leaveRequests/:id", temp.leavebyId); //temp

module.exports = router;
