const express = require("express");
const router = express.Router();

//paths
const temp = require("../controller/tempPage");

//html pages
router.get("/api/workers", temp.apiWorkers);
router.get("/api/leaveRequests", temp.apiMessages);
router.get("/api/clients", temp.apiClient);

router.get("/api/clients/:id", temp.clientbyId);
router.get("/api/workers/:id", temp.workerbyId);
router.get("/api/leaveRequests/:id", temp.leavebyId);

router.get("/api/clients_workers/:id", temp.clientsWorkers);
router.get("/api/workers_leaves/:id", temp.workersLeaves);
router.get("/api/clients_workers_leaves/:id", temp.clientsWorkersLeaves);

router.patch('/api/suggestedIds/:id', temp.suggestedIds)

router.delete("/api/workers/:id", temp.workerDelete);
router.delete("/api/leaveRequests/:id", temp.leaveRequestDelete);

module.exports = router;
