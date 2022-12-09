const commentController = require("express").Router();

const commentService = require("../Services/commentService");

const { isUser } = require("../Middlewares/guards");
const { catchAsyncError } = require("../Util/errorParser");

commentController.get(
  "/:offerId",
  catchAsyncError(async (req, res) => {
    const offerId = req.params.offerId;
    const comments = await commentService.getOfferComments(offerId);

    res.status(200).json(comments);
  })
);

commentController.post(
  "/:offerId",
  isUser(),
  catchAsyncError(async (req, res) => {
    const body = req.body;
    body.offer = req.params.offerId;
    body.user = req.user._id;

    const comment = await commentService.addComment(body);

    res.status(200).json(comment);
  })
);

module.exports = commentController;
