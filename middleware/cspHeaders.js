const { expressCspHeader, INLINE, NONE, SELF } = require("express-csp-header");
require("dotenv").config();
const PORT = process.env.PORT;

const cspHeaders = expressCspHeader({
  directives: {
    "default-src": [SELF],
    "script-src": [SELF, INLINE, "../public/scripts"],
    "style-src": [SELF, "../public/style_sheets"],
    "img-src": [
      "data:",
      "../public/images",
      "https://www.thebeecause.org/wp-content/uploads/2021/09/beesmart-beesafe-550x550.png",
    ],
    "worker-src": [NONE],
    "block-all-mixed-content": true,
  },
});

module.exports = cspHeaders;
