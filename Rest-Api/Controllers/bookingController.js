const bookingController = require("express").Router();

const bookingService = require("../Services/bookingService");
const { isUser } = require("../Middlewares/guards");
const { catchAsyncError } = require("../Util/errorParser");

bookingController.post(
  "/:offerId",
  isUser(),
  catchAsyncError(async (req, res) => {
    const body = req.body;
    body.offer = req.params.offerId;
    body.user = req.user._id;

    const bookingData = await bookingService.booking(body);

    res.json(bookingData);
  })
);

module.exports = bookingController;
