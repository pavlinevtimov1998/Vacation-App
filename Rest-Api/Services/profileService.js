const User = require("../models/User");
const Agency = require("../Models/Agency");

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
