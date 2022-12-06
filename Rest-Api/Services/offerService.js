const Booking = require("../Models/Booking");
const Offer = require("../Models/Offer");

const {
  getImagesUrl,
  asyncUnlink,
  deleteCloudinaryImage,
} = require("../Util/imageUpload");

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

const deleteOffer = async (agencyId, offerId) => {
  const offer = await Offer.findOne({ _id: offerId, agency: agencyId });

  const images = [];

  offer.images.forEach((img) => {
    const id = img.substring(img.lastIndexOf("/") + 1, img.lastIndexOf("."));
    console.log(id);
    images.push(id);
  });

  images.map(
    async (id) =>
      await deleteCloudinaryImage(id).then((result) => console.log(result))
  );

  return offer.delete();
};

module.exports = {
  createOffer,
  getOffers,
  getOne,
  booking,
  deleteOffer,
  cancelBooking,
};
