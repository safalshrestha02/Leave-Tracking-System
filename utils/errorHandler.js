const clientErrHandle = (err) => {
  let errors = {
    email: "",
    password: "",
  };

  if (err.message === "Invalid Credentials") {
    errors.email = "*Invalid Credentials";
    errors.password = "*Invalid Credentials";
  }

  if (err.code === 11000) {
    if (err.message.includes("companyName")) {
      errors.companyName = "*that company is already registered";
    }

    if (err.message.includes("companyID")) {
      errors.companyID = "*that companyID is already registered";
    }

    if (err.message.includes("email")) {
      errors.email = "*that email is already registered";
    }

    return errors;
  }

  if (err.message.includes("client validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

const workerErrHandle = (err) => {
  let errors = {
    email: "",
    password: "",
    workerID: "",
  };
  if (err.message === "Invalid Credentials") {
    errors.workerID = "*Invalid Credentials";
    errors.password = "*Invalid Credentials";
  }
  if (err.code === 11000) {
    if (err.message.includes("workerID")) {
      errors.workerID = "*this workerID already registered";
    }
    if (err.message.includes("email")) {
      errors.email = "*that email is already registered";
    }
    return errors;
  }
  if (err.message.includes("worker validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

module.exports = { clientErrHandle, workerErrHandle };
