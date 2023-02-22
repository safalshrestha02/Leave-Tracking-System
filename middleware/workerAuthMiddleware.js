const jwt = require("jsonwebtoken");
require("dotenv").config();

const requireWorkerAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.WORKER_TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        res.redirect("/worker_login");
      } else {
        next();
      }
    });
  } else {
    res.redirect("/worker_login");
  }
};

module.exports = { requireWorkerAuth };
