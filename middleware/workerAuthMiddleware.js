const jwt = require("jsonwebtoken");
require("dotenv").config();
const Worker = require("../models/worker");

const requireWorkerAuth = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }
    if (!token) {
      return res.redirect("/worker_login");
    }

    try {
      const decoded = jwt.verify(token, process.env.WORKER_TOKEN_SECRET);

      req.worker = await Worker.findById(decoded.id);
      next();
    } catch (error) {
      return res.redirect("/worker_login");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { requireWorkerAuth };
