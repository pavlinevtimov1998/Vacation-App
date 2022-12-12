const env = process.env.NODE_ENV || "development";

const config = {
  development: {
    PORT: process.env.PORT || 3000,
    DB_URL: process.env.DB_URL.replace("<PASSWORD>", process.env.DB_PASS), // enter your local MongoDB string here
    COOKIE_NAME: process.env.COOKIE_NAME || "token", // enter your cookie name here
    SECRET: process.env.JWT_SECRET || "very secret word", //enter your secret here
    SALT_ROUNDS: process.env.SALT || 10,
    CLOUDINARY: {
      cloud_name: process.env.CLOUD_NAME, // enter your cloud name from cloudinary account
      api_key: process.env.API_KEY, // enter your cloud key from cloudinary account
      api_secret: process.env.API_SECRET, // enter your cloud secret from cloudinary account
    },
    CORS: {
      origin: "http://localhost:4200",
    },
  },
  production: {
    PORT: process.env.PORT,
    DB_URL: process.env.DB_URL.replace("<PASSWORD>", process.env.DB_PASS),
    COOKIE_NAME: "token",
    SECRET: process.env.JWT_SECRET,
    SALT_ROUNDS: process.env.SALT,
    CLOUDINARY: {
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_KEY,
      api_secret: process.env.CLOUDINARY_SECRET,
    },
    CORS: {
      origin: "https://find-vacation.herokuapp.com",
    },
  },
};

module.exports = config[env];
