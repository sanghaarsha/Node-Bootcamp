exports.checkId = (req, res, next, val) => {
  // sample checking of id for test only
  if (val > 10) {
    return res.status(404).json({
      status: "failed",
      message: "invalid ID",
    });
  }
  next();
};

exports.getAllUsers = (req, res) => {
  res.status(500).send("Get all users route!");
};

exports.createUser = (req, res) => {
  res.status(500).send("Create user route!");
};

exports.getUser = (req, res) => {
  res.status(500).send("Get single user route!");
};

exports.updateUser = (req, res) => {
  res.status(500).send("Update user route!");
};

exports.deleteUser = (req, res) => {
  res.status(500).send("Delete user route!");
};
