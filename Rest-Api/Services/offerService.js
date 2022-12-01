const { unlink } = require("fs");
const mongoose = require("mongoose");

const Offer = require("../Models/Offer");
const Country = require("../Models/Country");

const { uploadToCloudinary } = require("../Util/imageUpload");

const getOffers = () =>
  Offer.find().select(
    "-description -ratingsQuantity -rating -peopleBooked -createdAt -__v -updatedAt"
  );

const getOne = (offerId) =>
  Offer.findOne({ _id: offerId }).select("-__v  -updatedAt");

const createOffer = async (body, files) => {
  const [country, images] = await Promise.all([
    Country.findOne({ name: body.country }),
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
      $push: { offers: offer._id },
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
