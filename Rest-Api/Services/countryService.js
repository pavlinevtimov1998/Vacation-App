const Country = require("../Models/Country");

const getAll = () => Country.find().sort({ name: 1 });

const getCountryOffers = (countryId) =>
  Country.findById(countryId).populate({
    path: "offers",
    select:
      "-description -__v -ratingsQuantity -rating -peopleBooked -createdAt -updatedAt",
    populate: {
      path: "country",
      select: "name",
    },
  });

module.exports = {
  getCountryOffers,
  getAll,
};
