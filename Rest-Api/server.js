const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;

dotenv.config({
  path: __dirname + "/config.env",
});

const config = require("./config/config");
const router = require("./router");
const cors = require("./Middlewares/cors");
const { initDB } = require("./config/database");
const { isAuth } = require("./Middlewares/isAuthMiddleware");

async function startServer() {
  const app = express();

  cloudinary.config(config.CLOUDINARY_CONFIG);

  await initDB(config.DB_URL);

  app.use(cors(config.CORS.origin));
  app.use(express.json());
  app.use(cookieParser());
  app.use("/", express.static(__dirname + "/public"));

  app.use(isAuth);
  app.use("/api", router);
  app.use((req, res, next) => {
    res.sendFile(__dirname + "/public");
  });

  app.listen(config.PORT, () =>
    console.log(`Server listening on port ${config.PORT}...`)
  );
}

startServer();
