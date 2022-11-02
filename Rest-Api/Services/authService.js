const bcrypt = require("bcrypt");

const User = require("../models/User");
const Business = require("../Models/Business");

const { getToken } = require("../util/jwtConfig");

exports.register = async (body) => {
  const { password, rePassword } = body;

  if (password !== rePassword) {
    throw {
      message: "Passwords don't match!",
      status: 400,
    };
  }

  if (body.isCompany) {
    const { companyName, email } = body;

    return await Business.create({ companyName, email, password });
  } else {
    const { email, username } = body;

    return User.create({ email, username, password });
  }
};

exports.login = async ({ password, email, isCompany }) => {
  let account;

  if (isCompany) {
    account = await Business.findOne({ email });
  } else {
    account = await User.findOne({ email });
  }

  if (!account) {
    throw unauthorized;
  }

  const isValid = await bcrypt.compare(password, account.password);

  if (!isValid) {
    throw unauthorized;
  }

  return isCompany
    ? [
        getToken({
          _id: account._id,
          email: account.email,
          companyName: account.companyName,
        }),
        account,
      ]
    : [
        getToken({
          _id: account._id,
          email: account.email,
          username: account.username,
        }),
        account,
      ];
};

const unauthorized = {
  message: "Username or password don't match!",
  status: 401,
};
