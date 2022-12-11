const Booking = require("../Models/Booking");
const Offer = require("../Models/Offer");

const { getImagesUrl, deleteCloudinaryImage } = require("../Util/imageUpload");

const getOffers = (skip, limit, search = "") =>
  Promise.all([
    Offer.find({
      title: { $regex: `^${search}`, $options: "i" },
    })
      .select(
        "-description -ratingsQuantity -rating -peopleBooked -createdAt -__v -updatedAt"
      )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Offer.find({
      title: { $regex: `^${search}`, $options: "i" },
    }).count(),
  ]);

const getOne = (offerId) => Offer.findOne({ _id: offerId });

const createOffer = async (body, files) => {
  const images = await getImagesUrl(files);

  body.images = images;
  body.features = body.features.split(",");

  return Offer.create(body);
};

const booking = (body) =>
  Promise.all([
    Booking.create(body),
    Offer.findByIdAndUpdate(body.offer, {
      $push: { peopleBooked: body.user },
    }),
  ]);

const cancelBooking = (offer, user) =>
  Promise.all([
    Booking.findOneAndDelete({ offer, user }),
    Offer.findByIdAndUpdate(offer, { $pull: { peopleBooked: user } }),
  ]);

const deleteOffer = async (agencyId, offerId) => {
  const offer = await Offer.findOne({ _id: offerId, agency: agencyId });

  if (!offer) {
    throw {
      message: "Not Found!",
    };
  }

  const imagesId = [];

  offer.images.forEach((img) => {
    const id = img.substring(img.lastIndexOf("/") + 1, img.lastIndexOf("."));
    imagesId.push(id);
  });

  return Promise.all([
    offer.delete(),
    Booking.deleteMany({ offer: offerId }),
    ...imagesId.map((id) => deleteCloudinaryImage(id)),
  ]);
};

module.exports = {
  createOffer,
  getOffers,
  getOne,
  booking,
  deleteOffer,
  cancelBooking,
};
