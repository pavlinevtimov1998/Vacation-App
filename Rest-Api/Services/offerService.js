const Offer = require("../Models/Offer");

const create = async (body, companyId) => {
  const offerData = {
    title: body.title,
    location: body.location,
    description: body.description,
    price: Number(body.price),
    companyId,
  };

  return await Offer.create(offerData);
};

module.exports = {
  create,
};
