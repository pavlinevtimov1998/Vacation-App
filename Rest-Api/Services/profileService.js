const User = require("../models/User");
const Agency = require("../Models/Agency");

exports.getAccountData = async (agency, user) => {
  if (agency) {
    return Agency.findById(agency._id)
      .select("-password -__v -updatedAt")
      .populate({
        path: "offers",
        select:
          "-description -updatedAt -__v -peopleBooked -ratingsQuantity -features",
      });
  } else {
    return User.findById(user._id).select("-password -__v -updatedAt");
  }
};

exports.getProfile = async (profileId) => {
  const [agency, user] = await Promise.all([
    Agency.findOne(profileId)
    .select("-password -__v -updatedAt")
    .populate({
      path: "offers",
      select:
        "-description -updatedAt -__v -peopleBooked -ratingsQuantity -features",
    }),
    User.findOne(profileId)
    .select("-password -__v -updatedAt"),
  ]);

  if (agency) {
    return agency;
  } else if (user) {
    return user;
  }

  throw {
    message: "Not Found!",
    status: 404,
  };
};
