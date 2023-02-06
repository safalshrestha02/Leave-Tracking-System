const Client = require("../models/ClientRegistration");
// const jwt = require("jsonwebtoken");

exports.clientRegistrationPage = async (req, res) => {
  const { companyName, companyAddress, name, email, password } = req.body;
  const FindCompany = await Client.findOne({
    companyName: req.body.companyName,
  });
  if (FindCompany != null) {
    console.log("Company name is already taken");
  }
  try {
    const client = await Client.create({
      companyName,
      companyAddress,
      name,
      email,
      password,
    });
    //   const token = createtoken(client._id);
    //   res.cookie(jwt, token, { httpOnly: true });
    res
      .status(201)
      .json({
        message: `Client registered successfully`,
      });
  } catch (err) {
    res.status(400);
    console.log(err.message);
  }
};
