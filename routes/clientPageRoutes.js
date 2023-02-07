const express = require("express");
const router = express.Router();

//paths
const loadPages = require("../controller/clientPageController");


//routes for client
router.get("/client_home", loadPages.homePage);
router.post('/', loadPages.login)

module.exports = router;
