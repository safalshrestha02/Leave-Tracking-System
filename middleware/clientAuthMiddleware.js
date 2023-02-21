const jwt = require("jsonwebtoken");
require("dotenv").config();

const requireClientAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  console.log("cliewnt jwt", "tokentokentoken");
  if (token) {
    jwt.verify(token, process.env.CLIENT_TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        res.redirect("/client_login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/client_login");
  }
};

module.exports = { requireClientAuth };
