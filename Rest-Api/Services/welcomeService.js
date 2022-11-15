const Offer = require("../Models/Offer");

const topOffers = () =>
  Offer.find()
    .sort({ rating: -1 })
    .limit(5)
    .select(
      "-town -country -description -ratingsQuantity -updatedAt -createdAt -__v"
    )
    .populate("agencyId", "-password -email -updatedAt -createdAt -__v");

const mockData = [
  {
    country: "Spain",
    id: "63722dd7bb32f901346fd4ad",
    imageUrl:
      "https://res.cloudinary.com/dlw7pmlvx/image/upload/v1668461400/spain_vuznoh.jpg",
  },
  {
    country: "France",
    id: "6372359c40b9485b69897803",
    imageUrl:
      "https://res.cloudinary.com/dlw7pmlvx/image/upload/v1668461422/france_fum18o.jpg",
  },
  {
    country: "Greece",
    id: "",
    imageUrl:
      "https://res.cloudinary.com/dlw7pmlvx/image/upload/v1668461413/greece_gmgi32.jpg",
  },
];

module.exports = {
  topOffers,
  mockData,
};
