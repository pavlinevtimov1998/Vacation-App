const User = require("../Models/User");
const Agency = require("../Models/Agency");
const Booking = require("../Models/Booking");
const Offer = require("../Models/Offer");

const { getImagesUrl, deleteCloudinaryImage } = require("../Util/imageUpload");

exports.getAccountData = async (agency, user) => {
  if (agency) {
    const agencyData = await Agency.findById(agency._id).select(
      "agencyName email image"
    );

    const result = JSON.parse(JSON.stringify(agencyData));
    result.isAgency = true;

    return result;
  } else {
    return User.findById(user._id).select("username image");
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

exports.getUserData = (userId) =>
  User.findById(userId).select("-password -createdAt -updatedAt -__v");

exports.getAgencyProfile = (agencyId) =>
  Agency.findById(agencyId).select("-password -__v");

exports.editUserData = async (userId, body, files) => {
  if (files) {
    const [image, user] = await Promise.all([
      getImagesUrl(files),
      User.findById(userId),
    ]);

    let cloudinaryImageId;

    body.image = image[0];

    if (user.image) {
      cloudinaryImageId = user.image.substring(
        user.image.lastIndexOf("/") + 1,
        user.image.lastIndexOf(".")
      );

      return Promise.all([
        User.findByIdAndUpdate(userId, body, { new: true }).select(
          "username image"
        ),
        deleteCloudinaryImage(cloudinaryImageId),
      ]);
    } else {
      return User.findByIdAndUpdate(userId, body, { new: true }).select(
        "username image"
      );
    }
  } else {
    return User.findByIdAndUpdate(userId, body, { new: true }).select(
      "username image"
    );
  }
};

exports.editAgencyData = async (agencyId, files, body) => {
  if (files) {
    const [image, agency] = await Promise.all([
      getImagesUrl(files),
      Agency.findById(agencyId),
    ]);

    let cloudinaryImageId;

    body.image = image[0];

    if (agency.image) {
      cloudinaryImageId = agency.image.substring(
        agency.image.lastIndexOf("/") + 1,
        agency.image.lastIndexOf(".")
      );

      return Promise.all([
        Agency.findByIdAndUpdate(agencyId, body, { new: true }),
        deleteCloudinaryImage(cloudinaryImageId),
      ]);
    } else {
      return Agency.findByIdAndUpdate(agencyId, body, { new: true });
    }
  } else {
    return Agency.findByIdAndUpdate(agencyId, body, { new: true });
  }
};

exports.getAgencyOffers = (agencyId, skip, limit) =>
  Promise.all([
    Offer.find({ agency: agencyId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Agency.findById(agencyId).select("agencyName"),
    Offer.find({ agency: agencyId }).count(),
  ]);
