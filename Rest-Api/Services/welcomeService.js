const Country = require("../Models/Country");
const Offer = require("../Models/Offer");

const topOffers = () =>
  Offer.find()
    .sort({ peopleFavourite: -1 })
    .limit(5)
    .select("agency images -country")
    .populate({
      path: "agency",
      select: "agencyName offers image",
    });

const TopCountries = () => Country.find().limit(3);

module.exports = {
  topOffers,
  TopCountries,
};
