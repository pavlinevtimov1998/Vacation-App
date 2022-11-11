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

exports.agencyRegister = async (body) => {
  const { password, rePassword } = body;

  if (password !== rePassword) {
    throw {
      message: "Passwords don't match!",
      status: 400,
    };
  }

  const agency = await Agency.create(body);

  return getToken({
    _id: agency._id,
    email: agency.email,
    agencyName: agency.agencyName,
  }).then((token) => {
    return [token, agency];
  });
};

exports.agencyLogin = async (body) => {
  const agency = await Agency.findOne({ email: body.email });

  if (!agency) {
    throw {
      message: "Email or password don't match!",
      status: 401,
    };
  }

  const isValid = await bcrypt.compare(body.password, agency.password);

  if (!isValid) {
    throw {
      message: "Email or password don't match!",
      status: 401,
    };
  }

  return getToken({
    _id: agency._id,
    email: agency.email,
    agencyName: agency.agencyName,
  }).then((token) => {
    return [token, agency];
  });
};

exports.getAccountData = async (agency, user) => {
  if (agency) {
    return Agency.findById(agency._id).then((agency) => {
      return [agency, true];
    });
  } else {
    return User.findById(user._id).then((user) => {
      return [user, false];
    });
  }
};
