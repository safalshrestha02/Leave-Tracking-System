const express = require("express");
const router = express.Router();

//paths
const loadPages = require("../controller/loadPages");

//landing page
router.get("/", loadPages.loginPage);

//routes for worker
router.get("/worker_home", loadPages.homePage);
router.get("/worker_applyLeave", loadPages.leavePage);
router.get("/worker_profile", loadPages.workerProfile);
router.get("/leave_history", loadPages.leaveHistory);
router.get("/api/workers", loadPages.apiWorkers)

module.exports = router;
