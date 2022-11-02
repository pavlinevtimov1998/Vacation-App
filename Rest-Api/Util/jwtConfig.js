const jwt = require("jsonwebtoken");

const { promisify } = require("util");

const secret = process.env.SECRET || "AKJSHVDGKJHBADS";

exports.getToken = (payload) => {
  const jwtSignPromise = promisify(jwt.sign);

  return jwtSignPromise(payload, secret, {
    expiresIn: "1d",
  });
};

exports.verifyToken = (token) => {
  const jwtVerify = promisify(jwt.verify);

  return jwtVerify(token, secret);
};
