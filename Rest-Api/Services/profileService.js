const User = require("../models/User");
const Agency = require("../Models/Agency");
const Booking = require("../Models/Booking");

exports.getAccountData = async (agency, user) => {
  if (agency) {
    return Agency.findById(agency._id).select("-password -__v -updatedAt");
  } else {
    return User.findById(user._id).select("-password -__v -updatedAt");
  }
};

exports.getUserProfile = async (_id) =>
  Promise.all([
    User.findOne({ _id }).select("-password -__v -updatedAt"),
    Booking.find({ user: _id })
      .populate({
        path: "offer",
        select:
          "-rating -ratingQuantity -createdAt -updatedAt -__v -description",
        populate: {
          path: "country",
          select: "name",
        },
      })
      .sort({ createdAt: -1 })
      .limit(3),
  ]);

exports.getAgencyProfile = (agencyId) =>
  Agency.findById(agencyId).select("-password -__v");
