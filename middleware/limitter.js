const rateLimit = require("express-rate-limit");

const createAccountLimiter = rateLimit({
  windowMS: 1 * 60 * 1000, //1 min
  max: 5,
  standardHeaers: true,
  legacyHeaders: true,
  message: "too many accounts created from this IP",
});

module.exports = { createAccountLimiter };
