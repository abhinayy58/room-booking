const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const updateUser = async (req, res, next) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password,10)
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};
const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
const getUsers = async (req, res, next) => {
  try {
    const users = await User.find({isAdmin:true});
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  updateUser,
  getUser,
  getUsers,
};
