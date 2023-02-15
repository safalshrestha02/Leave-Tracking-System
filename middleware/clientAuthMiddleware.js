const jwt = require("jsonwebtoken");
require("dotenv").config();

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
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

module.exports = { requireAuth };
