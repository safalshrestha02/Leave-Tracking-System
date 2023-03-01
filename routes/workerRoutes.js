const express = require("express");
const router = express.Router();
//const { createAccountLimiter } = require("../middleware/limitter");

//paths
const loadPages = require("../controller/workerPageController");
const workerAuth = require("../controller/workerAuth");
const { requireWorkerAuth } = require("../middleware/workerAuthMiddleware");

//html pages
router.get("/worker_login", loadPages.workerLogin);
router.get("/worker_home", requireWorkerAuth, loadPages.homePage);
router.get("/worker_applyLeave", requireWorkerAuth, loadPages.leavePage);
router.get("/worker_profile", requireWorkerAuth, loadPages.workerProfile);
router.get("/leave_history", requireWorkerAuth, loadPages.leaveHistory);
router.get("/logoutWorker", workerAuth.logout);

//APIs
router.post("/api/workerLogin", workerAuth.login);
router.post(
  "/api/applyForLeave",
  //createAccountLimiter,
  requireWorkerAuth,
  workerAuth.applyLeave
);
router.post("/api/activeWorker", requireWorkerAuth, workerAuth.activeWorker);

module.exports = router;
