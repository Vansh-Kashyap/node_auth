const bcryptjs = require("bcryptjs");
const userService = require("../services/user.service");
const User = require("../models/user.model");

exports.register = (req, res, next) => {
  const { password } = req.body;
  const salt = bcryptjs.genSaltSync(10);

  req.body.password = bcryptjs.hashSync(password, salt);

  userService.register(req.body, (error, result) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: "Success",
      data: result,
    });
  });
};

exports.login = (req, res, next) => {
  const { username, password } = req.body;

  userService.login({ username, password }, (error, result) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: "Success",
      data: result,
    });
  });
};

exports.userProfile = async (req, res, next) => {
  const username = req.body.username;
  const user = await User.findOne({ username });
  return res.status(200).json({
    message: "Authorized User!!!!!",
    data: user,
  });
};

exports.deleteUserProfile = async (req, res, next) => {
  const { id } = req.body;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(400).json("User not found");
    }
    res.status(200).json("User deleted successfully");
  } catch (e) {
    if (e.name === "CastError") return next("Oops!!! Wrong ID");
  }
};

exports.getAllUser = async (req, res) => {
  const { id, username } = req.body;
  const user = await User.findOne({ username });
  console.log(user, "user");
  if (user) {
    User.find({}).then(function (users) {
      res.send(users);
    });
  } else
    res
      .status(400)
      .json("Free mein nhi milega kuch bhi id aur username lekr aa bhai");
};
