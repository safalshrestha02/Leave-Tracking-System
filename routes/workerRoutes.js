const express = require("express");
const router = express.Router();
//const { createAccountLimiter } = require("../middleware/limitter");

//paths
const loadPages = require("../controller/workerPageController");
const workerAuth = require("../controller/workerAuth");
const workerAPI = require("../controller/workerAPI");
const resetPassword = require("../controller/resetPassword");
const { requireWorkerAuth } = require("../middleware/workerAuthMiddleware");

//html pages
router.get("/worker_login", loadPages.workerLogin);
router.get("/worker_home", requireWorkerAuth, loadPages.homePage);
router.get("/worker_applyLeave", requireWorkerAuth, loadPages.leavePage);
router.get("/worker_profile", requireWorkerAuth, loadPages.workerProfile);
router.get("/leave_history", requireWorkerAuth, loadPages.leaveHistory);
router.get("/worker_forgot_password", resetPassword.workerForgotPassword);
router.get("/worker_reset_password", resetPassword.workerResetPassword);
router.get("/logoutWorker", workerAuth.logout);

//APIs
router.get("/api/workers_leaves/:id", workerAPI.workersLeaves);

router.post("/api/workerLogin", workerAuth.login);
router.post(
  "/api/applyForLeave",
  //createAccountLimiter,
  requireWorkerAuth,
  workerAuth.applyLeave
);
router.post("/api/activeWorker", requireWorkerAuth, workerAuth.activeWorker);
router.post("/api/workerForgotPassword", workerAuth.forgotPassword);

router.put(
  "/api/changeWorkerPwd",
  requireWorkerAuth,
  workerAuth.changePassword
);
router.put("/api/workerResetPassword/:resetToken", workerAuth.resetPassword);

router.delete(
  "/api/leaveRequests/:id",
  requireWorkerAuth,
  workerAPI.leaveRequestDelete
);

module.exports = router;
