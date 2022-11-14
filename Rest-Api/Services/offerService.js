const { unlink } = require("fs");

const Offer = require("../Models/Offer");
const Country = require("../Models/Country");

const { uploadToCloudinary } = require("../Util/imageUpload");

const getAll = () => Offer.find();

const getOne = (offerId) => Offer.findById(offerId);

const createOffer = async (body, files) => {
  if (files.length == 0) {
    throw {
      message: "Images are required!",
      status: 400,
    };
  }

  body.images = await getImagesUrl(files);

  const country = await Country.findOne({ country: body.country });

  if (country) {
    return Offer.create(body);
  }

  return Offer.create(body)
    .then((offer) => {
      return [
        Country.create({
          country: body.country,
          image: body.images[0],
          offerId: offer._id,
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
  getAll,
  getOne,
};
