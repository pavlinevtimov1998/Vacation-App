const User = require("../models/User");
const Agency = require("../Models/Agency");
const Booking = require("../Models/Booking");

const {
  getImagesUrl,
  asyncUnlink,
  deleteCloudinaryImage,
} = require("../Util/imageUpload");

exports.getAccountData = async (agency, user) => {
  if (agency) {
    return Agency.findById(agency._id).select("-password -__v -updatedAt");
  } else {
    return User.findById(user._id).select("-password -__v -updatedAt");
  }
};

exports.getUserProfile = async (_id, skip, limit) =>
  Promise.all([
    User.findOne({ _id }).select("-password -__v -updatedAt"),
    Booking.find({ user: _id })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "offer",
        select:
          "-rating -ratingQuantity -createdAt -updatedAt -__v -description",
      })
      .sort({ createdAt: -1 }),
    Booking.find({ user: _id }).count(),
  ]);

exports.getAgencyProfile = (agencyId) =>
  Agency.findById(agencyId).select("-password -__v");

exports.editAgencyData = async (agencyId, files, body) => {
  if (files) {
    const [[image, localImage], agency] = await Promise.all([
      getImagesUrl(files),
      Agency.findById(agencyId),
    ]);

    let id;

    if (agency.image) {
      id = agency.image.substring(
        agency.image.lastIndexOf("/") + 1,
        agency.image.lastIndexOf(".")
      );

      body.image = image[0];

      return Promise.all([
        Agency.findByIdAndUpdate(agencyId, body),
        asyncUnlink(localImage),
        deleteCloudinaryImage(id),
      ]);
    } else {
      return Promise.all([
        Agency.findByIdAndUpdate(agencyId, body),
        asyncUnlink(localImage),
      ]);
    }
  } else {
    return Agency.findByIdAndUpdate(agencyId, body);
  }
};
