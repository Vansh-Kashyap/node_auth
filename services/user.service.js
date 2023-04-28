const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const auth = require("../middlewares/auth");

const login = async ({ username, password }, callback) => {
  const user = await User.findOne({ username });
  console.log(user, "user");

  if (user !== null) {
    var result = bcrypt.compareSync(password, user.password);
    if (result) {
      const token = auth.generateAccessToken(username);
      return callback(null, { ...user.toJSON(), token });
    } else {
      return callback({
        message: "Invalid Username/Password",
      });
    }
  } else {
    return callback({
      message: "Invalid Username/Password",
    });
  }
};

const register = async (params, callback) => {
  if (params.username === undefined) {
    return callback({ message: "Username Required" });
  }

  const user = new User(params);
  const token = auth.generateAccessToken(params.username);
  user
    .save()
    .then((response) => {
      return callback(null, { ...response.toJSON(), token });
    })
    .catch((error) => {
      return callback(error);
    });
};

module.exports = {
  login,
  register,
};
