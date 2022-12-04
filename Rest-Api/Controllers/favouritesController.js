const favouritesController = require("express").Router();

const favouritesService = require("../Services/favouritesService");
const { isUser } = require("../Middlewares/guards");
const { catchAsyncError } = require("../Util/errorParser");

favouritesController.post(
  "/:offerId",
  isUser(),
  catchAsyncError(async (req, res) => {
    const userId = req.user._id;
    const offerId = req.params.offerId;

    await favouritesService.addToFavourites(userId, offerId);

    res
      .status(200)
      .json({ message: "Successfully added to favourites!", userId });
  })
);

favouritesController.delete(
  "/remove/:offerId",
  isUser(),
  catchAsyncError(async (req, res) => {
    const userId = req.user._id;
    const offerId = req.params.offerId;

    await favouritesService.removeFromFavourites(userId, offerId);

    res
      .status(200)
      .json({ message: "Successfully removed from favourites!", userId });
  })
);

module.exports = favouritesController;
