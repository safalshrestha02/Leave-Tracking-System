const jwt = require("jsonwebtoken");
require("dotenv").config();

const requireClientAuth = async (req, res, next) => {
  // const { authorization } = req.headers;

  // if (!authorization) {
  //   return res.status(401).redirect("/client_login");
  // }

  // const token = authorization.split(" ")[1];

  // try {
  //   const { _id } = jwt.verify(token, process.env.CLIENT_TOKEN_SECRET);

  //   req.client = await Client.findOne({ _id }).select("_id");
  //   next();
  // } catch (error) {
  //   console.log(error);
  //   res.status(401).redirect("/client_login");
  // }

  const token = req.cookies.jwt;

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
