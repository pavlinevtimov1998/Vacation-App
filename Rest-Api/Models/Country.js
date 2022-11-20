const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  country: {
    type: String,
  },
  image: {
    type: String,
  },
  description: {
    type: String,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 3.5,
    min: 1,
    max: 5,
  },
  offers: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Offer",
      default: [],
    },
  ],
});

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
