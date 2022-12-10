const favoritesController = require("express").Router();

const favoritesService = require("../Services/favoritesService");
const { isUser } = require("../Middlewares/guards");
const { catchAsyncError } = require("../Util/errorParser");

favoritesController.get(
  "/",
  isUser(),
  catchAsyncError(async (req, res) => {
    const { skip, limit } = req.query;
    const userId = req.user._id;

    const [offers, offersCount] = await favoritesService.getUserFavourites(
      userId,
      skip,
      limit
    );

    res.status(200).json({ offers, offersCount });
  })
);

favoritesController.post(
  "/:offerId",
  isUser(),
  catchAsyncError(async (req, res) => {
    const userId = req.user._id;
    const offerId = req.params.offerId;

    await favoritesService.addToFavorites(userId, offerId);

    res
      .status(201)
      .json({ message: "Successfully added to favorites!", userId });
  })
);

favoritesController.delete(
  "/remove/:offerId",
  isUser(),
  catchAsyncError(async (req, res) => {
    const userId = req.user._id;
    const offerId = req.params.offerId;

    await favoritesService.removeFromFavorites(userId, offerId);

    res
      .status(204)
      .json({ message: "Successfully removed from favorites!", userId });
  })
);

module.exports = favoritesController;
