const express = require("express");
const router = express.Router();

//paths
const temp = require("../controller/tempPage");

//html pages
router.get("/api/workers", temp.apiWorkers);
router.get("/api/leaveRequests", temp.apiMessages);
router.get("/api/clients", temp.apiClient);

router.get("/api/clients/:id", temp.ClientbyId);
router.get("/api/workers/:id", temp.WorkerbyId);
router.get("/api/leaveRequests/:id", temp.LeavebyId);

router.get("/api/clients_workers/:id", temp.clientsWorkers)
router.get("/api/workers_leaves/:id", temp.workersLeaves)
router.get("/api/clients_workers_leaves/:id", temp.clientsWorkersLeaves)


router.delete("/api/workers/:id", temp.workerDelete)
router.delete("/api/leaveRequests/:id", temp.leaveRequestDelete)


module.exports = router;
