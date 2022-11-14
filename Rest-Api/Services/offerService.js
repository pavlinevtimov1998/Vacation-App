const { unlink } = require("fs");

const Offer = require("../Models/Offer");
const Country = require("../Models/Country");

const { uploadToCloudinary } = require("../Util/imageUpload");

const topOffers = () =>
  Offer.find()
    .sort({ rating: -1 })
    .limit(5)
    .select(
      "-town -country -description -ratingsQuantity -updatedAt -createdAt -__v"
    )
    .populate("agencyId", "-password -email -updatedAt -createdAt -__v");

const getOne = (offerId) => Offer.findById(offerId);

const createOffer = async (body, files) => {
  const [country, images] = await Promise.all([
    Country.findOne({ country: body.country }),
    getImagesUrl(files),
  ]);

  body.images = images;

  if (country) {
    return Offer.create(body)
      .then((offer) => {
        return [
          Country.findByIdAndUpdate(country._id, {
            $push: { offersId: offer._id },
          }),
          offer,
        ];
      })
      .then(([_, offer]) => {
        return offer;
      });
  }

  return Offer.create(body)
    .then((offer) => {
      return [
        Country.create({
          country: body.country,
          image: body.images[0],
          offersId: offer._id,
        }),
        offer,
      ];
    })
    .then(([_, offer]) => {
      return offer;
    });
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
  topOffers,
  getOne,
};
