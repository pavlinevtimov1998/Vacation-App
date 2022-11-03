const Offer = require("../Models/Offer");

const getAll = () => Offer.find().select("-description -program");

const getOne = (offerId) => Offer.findById(offerId);

const create = (body, companyId) => {
  const offerData = {
    title: body.title,
    location: body.location,
    description: body.description,
    price: Number(body.price),
    program: body.program,
    companyId,
  };

  return Offer.create(offerData);
};

module.exports = {
  create,
  getAll,
  getOne,
};
