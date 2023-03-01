const Client = require("../models/client");
const Leaves = require("../models/leave");
const Worker = require("../models/worker");
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
      .select(
        "companyName companyID companyAddress name email createdAt leavesYearly"
      )
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

exports.changeLeaveState = async (req, res, next) => {
  const id = req.params["id"];
  const approveState = req.body.approveState;
  try {
    const change = await Leaves.findByIdAndUpdate(id, {
      $set: {
        approveState,
      },
    });
    res.status(201);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

exports.changeLeaveDays = async (req, res, next) => {
  const id = req.params["id"];
  const leavesYearly = req.body.leavesYearly;
  const workerFilter = { "companyDetail._id": id };
  const leaveFilter = { "workerDetails.companyDetail._id": id };

  try {
    await Client.findByIdAndUpdate(id, {
      $set: {
        leavesYearly,
      },
    });
    await Worker.updateMany(workerFilter, { $set: { leavesYearly } }).then(
      () => {
        Leaves.updateMany(leaveFilter, { $set: { leavesYearly } }).then(() => {
          res.status(201).json({ success: true });
        });
      }
    );
  } catch (err) {
    res.json(err);
  }
};
