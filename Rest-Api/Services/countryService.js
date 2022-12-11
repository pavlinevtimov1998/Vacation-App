const Country = require("../Models/Country");
const Offer = require("../Models/Offer");

const getCountries = (skip, limit, search) =>
  Promise.all([
    Country.find({
      name: { $regex: `^${search}`, $options: "i" },
    })
      .select("name image")
      .sort({ name: 1 })
      .skip(skip)
      .limit(limit),
    Country.find({ name: { $regex: `^${search}`, $options: "i" } }).count(),
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
