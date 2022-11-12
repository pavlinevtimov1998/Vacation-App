const Offer = require("../Models/Offer");

const getAll = () => Offer.find().select("-description -program");

const getOne = (offerId) => Offer.findById(offerId);

const create = (body, agencyId) => {
  const offerData = {
    title: body.title,
    town: body.town,
    country: body.country,
    pricePerPerson: body.pricePerPerson,
    description: body.description,
    price: Number(body.price),
    agencyId,
  };

  return Offer.create(offerData);
};

module.exports = {
  create,
  getAll,
  getOne,
};
