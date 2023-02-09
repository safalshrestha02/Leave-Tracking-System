const express = require("express");
const router = express.Router();

//paths
const loadPages = require("../controller/clientPageController");
const clientRegistration = require("../controller/clientAuth");
//const clientLogin = require("../controller/clientAuth");

//html pages
router.get("/client_registration", loadPages.registerClient);
router.get("/client_login", loadPages.clientLogin);
router.get("/client_home", loadPages.homePage);
router.get("/client_leave_history", loadPages.leaveHistory);
router.get("/client_leave_settings", loadPages.leaveSettings);
router.get("/client_manage_leave", loadPages.manageLeave);
router.get("/client_manage_worker", loadPages.manageWorker);
router.get("/client_profile", loadPages.clientProfile);
router.get("/api/clients", loadPages.apiClient);

//APIs
router.post("/", clientRegistration.registerClient);
//router.post("/", clientLogin.login);

module.exports = router;
