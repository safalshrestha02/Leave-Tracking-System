const express = require("express");
const router = express.Router();
const { createAccountLimiter } = require("../middleware/limitter");

//paths
const loadPages = require("../controller/workerPageController");
const workerAuth = require("../controller/workerAuthController");
const workerAPI = require("../controller/workerAPI");
const { requireWorkerAuth } = require("../middleware/workerAuthMiddleware");

//html pages
router.get("/worker_login", loadPages.workerLogin);
router.get("/worker_home", requireWorkerAuth, loadPages.homePage);
router.get("/worker_applyLeave", requireWorkerAuth, loadPages.leavePage);
router.get("/worker_profile", requireWorkerAuth, loadPages.workerProfile);
router.get("/leave_history", requireWorkerAuth, loadPages.leaveHistory);
router.get("/worker_forgot_password", loadPages.workerForgotPassword);
router.get("/worker_reset_password", loadPages.workerResetPassword);
router.get("/logoutWorker", workerAuth.logout);

//APIs
router.get("/api/workers_leaves/:id", workerAPI.workersLeaves);

router.post("/api/workerLogin", workerAuth.login);
router.post(
  "/api/applyForLeave",
  createAccountLimiter,
  requireWorkerAuth,
  workerAuth.applyLeave
);
router.post("/api/activeWorker", requireWorkerAuth, workerAuth.activeWorker);
router.post("/api/workerForgotPassword", workerAuth.forgotPassword);

router.patch("/api/workerExpireUnapproved/:id", workerAPI.expireUnapproved)

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
