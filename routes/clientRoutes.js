const express = require("express");
const router = express.Router();
//const { createAccountLimiter } = require("../middleware/limitter");

//paths
const loadPages = require("../controller/clientPageController");
const clientAuth = require("../controller/clientAuthController");
const addworker = require("../controller/workerAuthController");
const clientAPI = require("../controller/clientAPI");
const { requireClientAuth } = require("../middleware/clientAuthMiddleware");

//html pages
router.get("/client_registration", loadPages.registerClient);
router.get("/client_login", loadPages.clientLogin);
router.get("/client_home", requireClientAuth, loadPages.homePage);
router.get("/client_leave_history", requireClientAuth, loadPages.leaveHistory);
router.get(
  "/client_leave_settings",
  requireClientAuth,
  loadPages.leaveSettings
);
router.get("/client_manage_leave", requireClientAuth, loadPages.manageLeave);
router.get("/client_manage_worker", requireClientAuth, loadPages.manageWorker);
router.get("/client_profile", requireClientAuth, loadPages.clientProfile);
router.get("/client_forgot_password", loadPages.clientForgotPassword);
router.get("/client_reset_password", loadPages.clientResetPassword);
router.get("/logoutClient", clientAuth.logout);

//APIs
router.get(
  "/api/clients_workers/:id",
  requireClientAuth,
  clientAPI.clientsWorkers
);
router.get("/api/clients_workers_leaves/:id", clientAPI.clientsWorkersLeaves);
router.get("/api/suggestedIds/:id", clientAPI.suggestedIds);

router.post(
  "/api/addWorker",
  // createAccountLimiter,
  requireClientAuth,
  addworker.registerWorker
);
router.post("/api/activeClient", requireClientAuth, clientAuth.activeClient);
router.post(
  "/api/clientRegister",
  //createAccountLimiter,
  clientAuth.registerClient
);
router.post("/api/clientLogin", clientAuth.login);
router.post("/api/forgotPassword", clientAuth.forgotPassword);

//PatchReqs
router.patch("/api/approveLeave/:id", clientAuth.changeLeaveState);
router.patch("/api/changeLeaveDays/:id/", clientAuth.changeLeaveDays);

router.put(
  "/api/changeClientPwd",
  requireClientAuth,
  clientAuth.changePassword
);
router.put("/api/clientResetPassword/:resetToken", clientAuth.resetPassword);

router.delete("/api/workers/:id", clientAPI.workerDelete);

module.exports = router;
