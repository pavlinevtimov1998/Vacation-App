const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    offer: {
      type: mongoose.Types.ObjectId,
      ref: "Offer",
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: { createdAt: "createdAt" },
  }
);

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
