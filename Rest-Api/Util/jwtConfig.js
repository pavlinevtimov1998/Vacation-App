const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const config = require("../config/config");

exports.getToken = (payload) => {
  const jwtSignPromise = promisify(jwt.sign);

  return jwtSignPromise(payload, config.SECRET, {
    expiresIn: "1d",
  });
};

exports.verifyToken = (token) => {
  const jwtVerify = promisify(jwt.verify);

  return jwtVerify(token, config.SECRET);
};
