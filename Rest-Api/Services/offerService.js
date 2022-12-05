const { unlink } = require("fs");
const { promisify } = require("util");

const Booking = require("../Models/Booking");
const Offer = require("../Models/Offer");

const { uploadToCloudinary } = require("../Util/imageUpload");

const getOffers = (skip, limit, search = "") =>
  Promise.all([
    Offer.find({
      title: { $regex: `${search}`, $options: "i" },
    })
      .select(
        "-description -ratingsQuantity -rating -peopleBooked -createdAt -__v -updatedAt"
      )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Offer.find({
      title: { $regex: `${search}`, $options: "i" },
    }).count(),
  ]);

const getOne = (offerId) => Offer.findOne({ _id: offerId });

const createOffer = async (body, files) => {
  const [images, localImages] = await getImagesUrl(files);
  body.images = images;
  body.features = body.features.split(",");

  return Promise.all([Offer.create(body), asyncUnlink(localImages)]);
};

const booking = (body) => Booking.create(body);

const cancelBooking = (offer, user) =>
  Booking.findOneAndDelete({ offer, user });

const deleteOffer = (agencyId, offerId) =>
  Offer.findOneAndDelete({ _id: offerId, agency: agencyId });

const getImagesUrl = async (files) => {
  const imagesUrl = [];
  const localUrls = [];

  for (let i = 0; i < files.length; i++) {
    const localFilePath = files[i].path;
    localUrls.push(localFilePath);

    await uploadToCloudinary(localFilePath).then((result) => {
      imagesUrl.push(result.url);
    });
  }

  return [imagesUrl, localUrls];
};

const asyncUnlink = (arr) => {
  const func = promisify(unlink);

  return arr.map((i) => func(i));
};

module.exports = {
  createOffer,
  getOffers,
  getOne,
  booking,
  deleteOffer,
  cancelBooking,
};
