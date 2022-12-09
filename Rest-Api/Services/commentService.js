const Comment = require("../Models/Comment");

const getOfferComments = (offerId) =>
  Comment.find({ offer: offerId }).populate({
    path: "user",
    select: "-password -createdAt -updatedAt -__v -bookedOffers",
  });

const addComment = async (body) => {
  const comment = await Comment.findOne({
    user: body.user,
    offer: body.offer,
  }).populate({
    path: "user",
    select: "username",
  });

  if (comment) {
    comment.content = body.content;

    return comment.save();
  }

  return Comment.create(body);
};

module.exports = {
  getOfferComments,
  addComment,
};
