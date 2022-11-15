const Country = require("../Models/Country");

const getAll = () => Country.find();

const getCountryOffers = (countryId) =>
  Country.findById(countryId).select("-image").populate("offersId");

module.exports = {
  getCountryOffers,
  getAll,
};
