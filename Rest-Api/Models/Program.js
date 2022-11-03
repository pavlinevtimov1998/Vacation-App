const mongoose = require("mongoose");

const programSchema = new mongoose.Schema({
  day: {
    type: Number,
  },
  description: {
    type: String,
  },
});
