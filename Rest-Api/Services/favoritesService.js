const Offer = require("../Models/Offer");

const getUserFavourites = (userId) => Offer.find({ peopleFavourite: userId });

const addToFavorites = (userId, offerId) =>
  Offer.findByIdAndUpdate(offerId, { $push: { peopleFavourite: userId } });

const removeFromFavorites = (userId, offerId) =>
  Offer.findByIdAndUpdate(offerId, { $pull: { peopleFavourite: userId } });

module.exports = {
  getUserFavourites,
  addToFavorites,
  removeFromFavorites,
};
