require("dotenv").config();
const jwt = require("jsonwebtoken");
const formatResponse = require("../utils/formatResponse");

function verifyRefreshToken(req, res, next) {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(401)
        .json(
          formatResponse(
            401,
            "No refresh token",
            null,
            "No refresh token provided"
          )
        );
    }

    const { user } = jwt.verify(refreshToken, process.env.SECRET_REFRESH_TOKEN);
    res.locals.user = user;
    next();
  } catch ({ message }) {
    res
      .status(401)
      .clearCookie("refreshToken")
      .json(
        formatResponse(
          401,
          "Invalid refresh token",
          null,
          message
        )
      );
  }
}

module.exports = verifyRefreshToken;