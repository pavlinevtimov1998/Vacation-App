const Booking = require("../Models/Booking");
const Offer = require("../Models/Offer");

const { getImagesUrl, asyncUnlink } = require("../Util/imageUpload");

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
  Promise.all([
    Booking.findOneAndDelete({ offer, user }),
    Offer.findByIdAndUpdate(offer, { $pull: { peopleBooked: user } }),
  ]);

const deleteOffer = (agencyId, offerId) =>
  Offer.findOneAndDelete({ _id: offerId, agency: agencyId });

module.exports = {
  createOffer,
  getOffers,
  getOne,
  booking,
  deleteOffer,
  cancelBooking,
};
