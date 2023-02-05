const Worker = require("../models/AddWorker");
const bcrypt = require("bcrypt");

exports.registerWorker = async (req, res) => {
  const { firstName, lastName, gender, email, password } = req.body;

  if (!firstName || !lastName) {
    return res
      .status(400)
      .json({ message: "Firstname and Lastname is required" });
  } else if (!gender) {
    return res.status(400).json({ message: "Select your gender" });
  } else if (!email || !password) {
    return res.status(400).json({ message: "Email and password is required" });
  }

  const duplicate = await Worker.findOne({ employeeEmail: email }).exec();
  if (duplicate)
    return res.status(409).json({ message: "Email is already taken" });

  try {
    const hashedPwd = await bcrypt.hash(password, 10);

    const result = await Worker.create({
      firstName: firstName,
      lastName: lastName,
      gender: gender,
      employeeEmail: email,
      password: hashedPwd,
    });
    res
      .status(201)
      .json({ message: `New employee ${firstName} ${lastName} created` });
  } catch (err) {
    console.log(err);
  }
};
