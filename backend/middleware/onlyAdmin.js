const jwt = require("jsonwebtoken");
const User = require("../model/user");

const config = process.env;

const onlyAdmin = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, config.TOKEN_KEY);
    const resultUser = await User.findOne({ email: decoded.email });
    if (resultUser.kind != "admin") {
      return (res.status(401).send("Action require admin account"));
    }
  } catch (err) {
    console.log(err);
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = onlyAdmin;