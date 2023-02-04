const express = require("express");
const router = express.Router();

const clientRegistration = require("../controller/clientRegistration");

router.post("/", clientRegistration.clientRegistrationPage);

module.exports = router;
