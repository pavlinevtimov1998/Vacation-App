const bcrypt = require("bcrypt");

const Agency = require("../Models/Agency");
const { getToken } = require("../util/jwtConfig");

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

exports.getTopAgencies = () =>
  Agency.find().select("-password -__v").sort({ rating: -1 }).limit(3);
