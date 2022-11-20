const Country = require("../Models/Country");

const getAll = () => Country.find().sort({ name: -1 });

const getCountryOffers = (countryId) =>
  Country.findById(countryId)
    .select("-image")
    .populate({
      path: "offers",
      select:
        "-description -__v -ratingsQuantity -rating -peopleBooked -createdAt",
      populate: {
        path: "country",
        select: "-image",
      },
    });

module.exports = {
  getCountryOffers,
  getAll,
};
