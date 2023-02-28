const express = require("express");
const router = express.Router();
const rateLimit = require('express-rate-limit')
const createAccountLimiter = rateLimit({
    windowMS: 1 * 60 * 1000, //1 min
    max: 15,
    standardHeaers: true,
    legacyHeaders: true,
    message: "too many leave requests sent from this IP",
  });
  

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
router.post("/api/applyForLeave",createAccountLimiter, requireWorkerAuth, workerAuth.applyLeave);
router.post("/api/activeWorker", requireWorkerAuth, workerAuth.activeWorker);

module.exports = router;
