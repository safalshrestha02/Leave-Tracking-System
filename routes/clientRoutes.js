const express = require("express");
const router = express.Router();

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
router.post("/api/addWorker", requireClientAuth, addworker.registerWorker);
router.post("/api/activeClient", requireClientAuth, clientAuth.activeClient);
router.post("/api/clientRegister", clientAuth.registerClient);
router.post("/api/clientLogin", clientAuth.login);

router.patch("/api/approveLeave/:id", clientAuth.approveLeave);
router.patch("/api/denyLeave/:id", clientAuth.denyLeave);
router.patch("/api/changeLeaveDays/:id/:days", clientAuth.changeLeaveDays);



module.exports = router;
