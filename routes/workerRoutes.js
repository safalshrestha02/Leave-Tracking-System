const express = require("express");
const router = express.Router();

//paths
const loadPages = require("../controller/workerPageController");
const workerRegistration = require("../controller/workerAuth");
const { requireWorkerAuth } = require("../middleware/workerAuthMiddleware");

//html pages
router.get("/worker_home", requireWorkerAuth, loadPages.homePage);
router.get("/worker_applyLeave", requireWorkerAuth, loadPages.leavePage);
router.get("/worker_profile", requireWorkerAuth, loadPages.workerProfile);
router.get("/leave_history", requireWorkerAuth, loadPages.leaveHistory);

//APIs
router.post("/worker_applyLeave", workerRegistration.applyLeave);

module.exports = router;
