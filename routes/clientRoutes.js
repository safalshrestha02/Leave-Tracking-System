const express = require("express");
const router = express.Router();

const clientRegistration = require("../controller/clientAuth");

router.post("/", clientRegistration.registerClient);

module.exports = router;
