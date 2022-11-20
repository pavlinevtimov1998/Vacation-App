const { unlink } = require("fs");
const mongoose = require("mongoose");

const Offer = require("../Models/Offer");
const Country = require("../Models/Country");

const { uploadToCloudinary } = require("../Util/imageUpload");

const getOffers = () =>
  Offer.find()
    .select(
      "-description -__v -ratingsQuantity -rating -peopleBooked -createdAt"
    )
    .sort({ createdAt: -1 })
    .populate({
      path: "country",
      select: "-image, -__v -offersId",
    });

const getOne = (offerId) =>
  Offer.findById(offerId)
    .select("-__v  -updatedAt")
    .populate({
      path: "agency",
      select: "-__v -createdAt -updatedAt -password",
      populate: {
        path: "offers",
        select:
          "-description -__v -ratingsQuantity -rating -peopleBooked -createdAt",
        options: { limit: 3, sort: { rating: -1 } },
        populate: {
          path: "country",
          select: "-image -__v -offers",
        },
      },
    })
    .populate({
      path: "country",
      select: "-image -__v -offers -rating -ratingQuantity",
    });

const createOffer = async (body, files) => {
  const [country, images] = await Promise.all([
    Country.findOne({ country: body.country }),
    getImagesUrl(files),
  ]);

  body.images = images;
  body.country = country._id;
  body._id = new mongoose.Types.ObjectId();
  body.features = body.features.split(",");

  const offer = new Offer(body);

  return Promise.all([
    offer.save(),
    Country.findByIdAndUpdate(country._id, {
      $push: { offersId: offer._id },
    }),
  ]);
};

const getImagesUrl = async (files) => {
  const imagesUrl = [];

  for (let i = 0; i < files.length; i++) {
    const localFilePath = files[i].path;

    await uploadToCloudinary(localFilePath).then((result) => {
      unlink(localFilePath, (err) => {
        if (err) {
          throw { message: "Unsuccessful img deleting!" };
        }
      });

      imagesUrl.push(result.url);
    });
  }

  return imagesUrl;
};

module.exports = {
  createOffer,
  getOffers,
  getOne,
};
