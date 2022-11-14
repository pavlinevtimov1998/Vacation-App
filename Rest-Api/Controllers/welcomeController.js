const welcomeController = require("express").Router();

const offerService = require("../Services/offerService");
const { catchAsyncError } = require("../Util/errorParser");

welcomeController.get(
  "/",
  catchAsyncError(async (req, res) => {
    const topOffers = await offerService.topOffers();

    res.status(200).json(topOffers);
  })
);

const mockData = [
  {
    country: "Spain",
    imgUrl:
      "https://res.cloudinary.com/dlw7pmlvx/image/upload/v1668461400/spain_vuznoh.jpg",
  },
  {
    country: "France",
    imgUrl:
      "https://res.cloudinary.com/dlw7pmlvx/image/upload/v1668461422/france_fum18o.jpg",
  },
  {
    country: "Greece",
    imgUrl:
      "https://res.cloudinary.com/dlw7pmlvx/image/upload/v1668461413/greece_gmgi32.jpg",
  },
];

module.exports = welcomeController;
