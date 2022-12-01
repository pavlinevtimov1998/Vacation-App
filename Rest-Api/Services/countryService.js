const Country = require("../Models/Country");
const Offer = require("../Models/Offer");

const getAll = () => Country.find().sort({ name: 1 });

const getCountry = (countryId) =>
  Promise.all([
    Country.findById(countryId),
    Offer.find({ country: countryId }).count(),
  ]);

const getCountryOffers = (countryId, skip = 0, limit = 3) =>
  Offer.find({ country: countryId }).skip(skip).limit(limit);

module.exports = {
  getCountry,
  getCountryOffers,
  getAll,
};
