const Country = require("../Models/Country");
const Offer = require("../Models/Offer");

const getCountries = (skip, limit) =>
  Promise.all([
    Country.find()
      .select("name image")
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit),
    Country.find().count(),
  ]);

const getAll = () => Country.find().select("name");

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
  getCountries,
};
