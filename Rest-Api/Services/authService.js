const bcrypt = require("bcrypt");

const User = require("../models/User");
const Agency = require("../Models/Agency");

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

  return [getToken({ _id: user._id, username: user.username }), user];
};

exports.login = async (body) => {
  const user = await User.findOne({ username: body.username });

  if (!user) {
    throw {
      message: "Username or password don't match!",
      status: 401,
    };
  }

  const isValid = await bcrypt.compare(password, account.password);

  if (!isValid) {
    throw {
      message: "Username or password don't match!",
      status: 401,
    };
  }

  return [getToken({ _id: account._id, username: account.username }), user];
};

exports.agencyRegister = async (body) => {
  const { password, rePassword } = body;

  if (password !== rePassword) {
    throw {
      message: "Passwords don't match!",
      status: 400,
    };
  }

  const agency = await Agency.create(body);

  return [
    getToken({
      _id: agency._id,
      email: agency.email,
      agencyName: agency.agencyName,
    }),
    agency,
  ];
};

exports.agencyLogin = async (body) => {
  const agency = await Agency.findOne({ email: body.email });

  if (!agency) {
    throw {
      message: "Email or password don't match!",
      status: 401,
    };
  }

  const isValid = await bcrypt.compare(body.password, account.password);

  if (!isValid) {
    throw {
      message: "Email or password don't match!",
      status: 401,
    };
  }

  return [
    getToken({
      _id: agency._id,
      email: agency.email,
      agencyName: agency.agencyName,
    }),
    agency,
  ];
};
