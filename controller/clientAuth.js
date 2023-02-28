const Client = require("../models/ClientRegistration");
const Leaves = require("../models/RequestForLeave");
const { clientErrHandle } = require("../utils/errorHandler");
const { createClientToken } = require("../utils/createToken");

const maxAge = 2 * 24 * 60 * 60;

exports.registerClient = async (req, res) => {
  const {
    clientID,
    companyName,
    companyID,
    companyAddress,
    name,
    email,
    password,
    leavesYearly,
  } = req.body;
  try {
    const client = await Client.create({
      clientID,
      companyName,
      companyID,
      companyAddress,
      name,
      email,
      password,
      leavesYearly,
    });

    res.status(201).json({ client: client._id });
  } catch (err) {
    const errors = clientErrHandle(err);
    res.status(401).json({ errors });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const client = await Client.login(email, password);
    const token = createClientToken(client._id);

    res.cookie("jwt", token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
    });
    res.status(201).json({ msg: "Logged in" });
  } catch (err) {
    const errors = clientErrHandle(err);
    res.status(400).json({ errors });
  }
};

exports.activeClient = async (req, res, next) => {
  try {
    const client = await Client.findById(req.client.id)
      .select("companyName companyID companyAddress name email createdAt leavesYearly")
      .exec();
    res.status(200).json({ data: client });
  } catch (error) {
    return error;
  }
};

exports.logout = async (req, res, next) => {
  try {
    res.cookie("jwt", " ", {
      expiresIn: { maxAge: 1 },
      httpOnly: true,
    });
    res.status(200).redirect("/");
  } catch (error) {
    return error;
  }
};

exports.approveLeave = async (req, res, next) => {
  const id = req.params["id"];
  const approve = { approveState: "approved" };
  const leave = await Leaves.findByIdAndUpdate(id, approve);
};

exports.denyLeave = async (req, res, next) => {
  const id = req.params["id"];
  const deny = { approveState: "rejected" };
  const leave = await Leaves.findByIdAndUpdate(id, deny);
};

exports.changeLeaveDays = async (req, res, next) => {
  const id = req.params["id"];
  const day = req.params["days"];
  const days = { leavesYearly: day };
  const client = await Client.findByIdAndUpdate(id, days);
};
