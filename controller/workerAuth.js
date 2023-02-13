const Worker = require("../models/AddWorker");

const handleErr = (err) => {
  let errors = {
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
  };

  if (err.message === "Invalid Credentials") {
    errors.email = "Invalid Credentials";
    errors.password = "Invalid Credentials";
  }

  if (err.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }

  if (err.message.includes("registerWorker validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

exports.registerWorker = async (req, res) => {
  const { firstName, lastName, gender,workerID, email, password, country, city } = req.body;
  try {
    const worker = await Worker.create({
      firstName,
      lastName,
      gender,
      workerID,
      email,
      password,
      country,
      city
    });
    res.status(201).json({ message: "Worker created successfully" });
  } catch (err) {
    const errors = handleErr(err);
    res.status(401).json({ errors });
  }
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const client = await Client.login(email, password, companyName);
    const token = createToken(client._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).redirect("/client_home");
  } catch (err) {
    const errors = handleErr(err);
    res.status(400).json({ errors });
  }
};