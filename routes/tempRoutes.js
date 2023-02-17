const express = require("express");
const router = express.Router();

//paths
const temp = require("../controller/tempPage");

//html pages
router.get("/api/workers", temp.apiWorkers);
router.get("/api/leaveRequests", temp.apiMessages);
router.get("/api/clients", temp.apiClient);

module.exports = router;
