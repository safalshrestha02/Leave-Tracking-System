const express = require("express");
const router = express.Router();

//paths
const loadPages = require("../controller/clientPageController");
const clientRegistration = require("../controller/clientAuth");
const addworker = require("../controller/workerAuth");
const { requireClientAuth } = require("../middleware/clientAuthMiddleware");

//html pages
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

//APIs
router.get("/logout", clientRegistration.logout);
router.post("/client_add_worker", addworker.registerWorker);

module.exports = router;
