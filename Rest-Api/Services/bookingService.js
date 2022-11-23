const Booking = require("../Models/Booking");

const booking = (body) => Booking.create(body);

module.exports = {
  booking,
};
