const express = require("express");
const router = express.Router();

//path
const temp = require("../controller/tempPage");

//html pages
router.get("/api/workers", temp.apiWorkers); 
router.get("/api/leaveRequests", temp.apiMessages); 
router.get("/api/clients", temp.apiClient);
router.get("/api/clients/:id", temp.clientbyId);
router.get("/api/workers/:id", temp.workerbyId);
router.get("/api/leaveRequests/:id", temp.leavebyId);

module.exports = router;
