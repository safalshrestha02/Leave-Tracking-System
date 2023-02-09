const Worker = require("../models/AddWorker");

const handleErr = (err) => {
  let errors = {
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
  };

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
  const { firstName, lastName, gender, email, password } = req.body;

  try {
    const worker = await Worker.create({
      firstName,
      lastName,
      gender,
      email,
      password,
    });
    res.status(201).json({ message: "Worker created successfully" });
  } catch (err) {
    const errors = handleErr(err);
    res.status(401).json({ errors });
  }
};
