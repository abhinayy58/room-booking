const jwt = require("jsonwebtoken");
const createError = require("../utils/Error.js");

const verifyToken = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }
  token = token.split(" ")[1]; // Remove Bearer from string

  if (token === "null" || !token)
    return res.status(401).send("Unauthorized request");

  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
};

const verifyAdmin = (req, res, next) => {
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
};
 
module.exports = {
  verifyAdmin,
  verifyToken,
  verifyUser,
};
