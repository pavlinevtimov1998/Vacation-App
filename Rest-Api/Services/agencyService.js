const bcrypt = require("bcrypt");

const Agency = require("../Models/Agency");

exports.register = async (body) => {
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

exports.login = async (body) => {
  const agency = await Agency.findOne({ email: body.email });

  if (!agency) {
    throw unauthorized;
  }

  const isValid = await bcrypt.compare(body.password, account.password);

  if (!isValid) {
    throw unauthorized;
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

const unauthorized = {
  message: "Username or password don't match!",
  status: 401,
};
