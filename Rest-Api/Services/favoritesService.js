const Offer = require("../Models/Offer");

const getUserFavourites = (userId, skip, limit) =>
  Promise.all([
    Offer.find({ peopleFavourite: userId }).skip(skip).limit(limit),
    Offer.find({ peopleFavourite: userId }).count(),
  ]);

const addToFavorites = (userId, offerId) =>
  Offer.findByIdAndUpdate(offerId, { $push: { peopleFavourite: userId } });

const removeFromFavorites = (userId, offerId) =>
  Offer.findByIdAndUpdate(offerId, { $pull: { peopleFavourite: userId } });

module.exports = {
  getUserFavourites,
  addToFavorites,
  removeFromFavorites,
};
