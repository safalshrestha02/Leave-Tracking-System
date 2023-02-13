const express = require("express");
const router = express.Router();

//paths
const loadPages = require("../controller/clientPageController");
const clientRegistration = require("../controller/clientAuth");
const addworker = require("../controller/workerAuth");
//html pages
router.get("/client_home", loadPages.homePage);
router.get("/client_leave_history", loadPages.leaveHistory);
router.get("/client_leave_settings", loadPages.leaveSettings);
router.get("/client_manage_leave", loadPages.manageLeave);
router.get("/client_manage_worker", loadPages.manageWorker);
router.get("/client_profile", loadPages.clientProfile);
router.get("/api/clients", loadPages.apiClient);

//APIs
router.post("/client_registration", clientRegistration.registerClient);
router.post("/client_login", clientRegistration.login);
router.post("/client_add_worker", addworker.registerWorker);

module.exports = router;
