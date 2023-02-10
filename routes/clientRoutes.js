const express = require("express");
const router = express.Router();

//paths
const loadPages = require("../controller/clientPageController");
const clientRegistration = require("../controller/clientAuth");

//html pages
router.get("/client_registration", loadPages.registerClient);
router.get("/client_login", loadPages.clientLogin);
router.get("/client_home/:id", loadPages.homePage);
router.get("/client_leave_history", loadPages.leaveHistory);
router.get("/client_leave_settings", loadPages.leaveSettings);
router.get("/client_manage_leave", loadPages.manageLeave);
router.get("/client_manage_worker", loadPages.manageWorker);
router.get("/client_profile", loadPages.clientProfile);
router.get("/api/clients", loadPages.apiClient);

//APIs
router.post("/client_registration", clientRegistration.registerClient);
router.post("/client_login", clientRegistration.login);

module.exports = router;
