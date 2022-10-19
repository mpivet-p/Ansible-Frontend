const jwt = require("jsonwebtoken");
const User = require("./model/user");


async function getTokensFromEmail(email, user) {
    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "7d",
      }
    );
    const refreshToken = jwt.sign(
      { user_id: user._id, email , refresh: 1},
      process.env.TOKEN_KEY,
      {
        expiresIn: "3d",
      }
    );

    user.token = token;
    return ({token: token, refreshToken: refreshToken });
}

module.exports = getTokensFromEmail;