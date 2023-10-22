const User = require("../models/User.js");
const bcrypt = require("bcryptjs");
const createError = require("../utils/Error.js");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send("User has been created.");
  } catch (err) {
    next(err);
  }
};
const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT,
      {expiresIn:'30d'}
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res.status(200).header("auth-token", token).json({ token, details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  register,
};
