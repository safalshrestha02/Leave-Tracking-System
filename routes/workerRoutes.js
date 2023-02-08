const express = require("express");
const router = express.Router();

//paths
const loadPages = require("../controller/workerPageController");
const workerRegistration = require("../controller/workerAuth");

//html pages
router.get("/", loadPages.loginPage); //landing page
router.get("/worker_home", loadPages.homePage);
router.get("/worker_applyLeave", loadPages.leavePage);
router.get("/worker_profile", loadPages.workerProfile);
router.get("/leave_history", loadPages.leaveHistory);
router.get("/api/workers", loadPages.apiWorkers);
router.get("/api/leaveMessages", loadPages.apiMessages)

//APIs
router.post("/", workerRegistration.registerWorker);

module.exports = router;