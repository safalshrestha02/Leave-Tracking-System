const express = require("express");
const router = express.Router();
//const { createAccountLimiter } = require("../middleware/limitter");

//paths
const loadPages = require("../controller/clientPageController");
const clientAuth = require("../controller/clientAuth");
const addworker = require("../controller/workerAuth");
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
router.get("/logoutClient", clientAuth.logout);

//APIs
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

//PatchReqs
router.patch("/api/approveLeave/:id", clientAuth.changeLeaveState);
router.patch("/api/changeLeaveDays/:id/", clientAuth.changeLeaveDays);

router.put(
  "/api/changeClientPwd",
  requireClientAuth,
  clientAuth.changePassword
);

module.exports = router;
