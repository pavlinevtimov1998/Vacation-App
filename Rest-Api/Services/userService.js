const bcrypt = require("bcrypt");

const User = require("../models/User");
const { getToken } = require("../util/jwtConfig");

exports.register = async (body) => {
  const { password, rePassword } = body;

  if (password !== rePassword) {
    throw {
      message: "Passwords don't match!",
      status: 400,
    };
  }

  const user = await User.create(body);

  return [getToken({ _id: user._id, username: account.username }), user];
};

exports.login = async (body) => {
  const user = await User.findOne({ username: body.username });

  if (!user) {
    throw unauthorized;
  }

  const isValid = await bcrypt.compare(password, account.password);

  if (!isValid) {
    throw unauthorized;
  }

  return [getToken({ _id: account._id, username: account.username }), user];
};

const unauthorized = {
  message: "Username or password don't match!",
  status: 401,
};
