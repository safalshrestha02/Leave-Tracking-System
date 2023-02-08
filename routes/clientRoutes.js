const express = require("express");
const router = express.Router();

//paths
const loadPages = require("../controller/clientPageController");
const clientRegistration = require("../controller/clientAuth");
const clientLogin = require("../controller/clientAuth");

//routes for client
router.get("/client_home", loadPages.homePage);
router.get("/client_leave_history", loadPages.leaveHistory);
router.get("/client_leave_settings", loadPages.leaveSettings);
router.get("/client_manage_leave", loadPages.manageLeave);
router.get("/client_manage_worker", loadPages.manageWorker);
router.get("/client_profile", loadPages.clientProfile);
router.get("/api/clients", loadPages.apiClient);

router.post("/", clientLogin.login);
router.post("/", clientRegistration.registerClient);

module.exports = router;
