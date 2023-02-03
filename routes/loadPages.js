const express = require("express");
const router = express.Router();

//paths
const loadPages = require("./../controller/loadPages");

router.get("/", loadPages.loginPage);
router.get("/home", loadPages.homePage);
router.get("/leave", loadPages.leavePage);
router.post("/client_registration", loadPages.clientRegistrationPage);

module.exports = router;