const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;

const router = require("./router");
const cors = require("./Middlewares/cors");
const { initDB } = require("./config/database");
const { isAuth } = require("./Middlewares/isAuthMiddleware");

dotenv.config({
  path: __dirname + "/config.env",
});

const port = process.env.PORT || 3030;
const databaseUrl = process.env.PRODUCTION_DB_URL.replace(
  "<PASSWORD>",
  process.env.DB_PASS
);

async function startServer() {
  const app = express();

  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
  });

  await initDB(databaseUrl);

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(isAuth);
  app.use(router);

  app.listen(port, () => console.log(`Server listening on port ${port}...`));
}

startServer();
