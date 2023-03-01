const jwt = require("jsonwebtoken");
require("dotenv").config();
const Client = require("../models/client");

const requireClientAuth = async (req, res, next) => {
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
      return res.redirect("/client_login");
    }

    try {
      const decoded = jwt.verify(token, process.env.CLIENT_TOKEN_SECRET);

      req.client = await Client.findById(decoded.id);

      next();
    } catch (error) {
      return res.redirect("/client_login");
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { requireClientAuth };
