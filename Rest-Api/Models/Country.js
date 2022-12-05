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
  info: {
    type: String,
    required: true,
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
