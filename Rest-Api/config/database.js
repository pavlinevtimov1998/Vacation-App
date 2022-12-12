const mongoose = require("mongoose");

exports.initDB = (url) => {
  return mongoose
    .connect(url, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    .then(() => {
      console.log("DB successfully connected!");
    })
    .catch((err) => {
      console.log("DATABASE ERROR!");
      console.log(err.message);
      process.exit(1);
    });
};
