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

  return getToken({ _id: user._id, username: user.username }).then((token) => {
    return [token, user];
  });
};

exports.login = async (body) => {
  const user = await User.findOne({ username: body.username });

  if (!user) {
    throw {
      message: "Username or password don't match!",
      status: 401,
    };
  }

  const isValid = await bcrypt.compare(body.password, user.password);

  if (!isValid) {
    throw {
      message: "Username or password don't match!",
      status: 401,
    };
  }

  return getToken({ _id: user._id, username: user.username }).then((token) => {
    return [token, user];
  });
};



