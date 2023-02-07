const express = require("express");
const router = express.Router();

//paths
const loadPages = require("../controller/clientPageController");


//routes for client
router.get("/client_home", loadPages.homePage);
router.get("/client_leave_history", loadPages.leaveHistory);
router.get("/client_leave_settings", loadPages.leaveSettings);
router.get("/client_manage_leave", loadPages.manageLeave);
router.get("/client_manage_worker", loadPages.manageWorker);
router.get("/client_profile", loadPages.clientProfile);


router.post('/', loadPages.login)

module.exports = router;
