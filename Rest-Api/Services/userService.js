const User = require("../models/User");
const bcrypt = require("bcrypt");

const { getToken } = require("../util/jwtConfig");

exports.register = async ({ password, rePassword, username, email }) => {
  if (password !== rePassword) {
    throw {
      message: "Passwords don't match!",
      status: 400,
    };
  }

  const user = await User.create({ email, username, password });

  return [
    getToken({
      _id: user._id,
      email: user.email,
      username: user.username,
    }),
    user,
  ];
};

exports.login = async ({ password, email }) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw unauthorized;
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw unauthorized;
  }

  return getToken({
    _id: user._id,
    email: user.email,
    username: user.username,
  });
};

const unauthorized = {
  message: "Username or password don't match!",
  status: 401,
};
