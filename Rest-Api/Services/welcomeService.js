const Country = require("../Models/Country");
const Offer = require("../Models/Offer");
const { options } = require("../router");

const topOffers = () =>
  Offer.find()
    .sort({ peopleBooked: -1 })
    .limit(5)
    .select("agency images -country")
    .populate({
      path: "agency",
      select: "agencyName offers image",
    });

const TopCountries = () => Country.find().sort({ rating: -1 }).limit(3);

module.exports = {
  topOffers,
  TopCountries,
};
