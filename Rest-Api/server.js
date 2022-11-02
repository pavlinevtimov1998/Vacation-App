const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const router = require("./router");
const cors = require("./Middlewares/cors");
const { initDB } = require("./config/database");
const { isAuth } = require("./Middlewares/isAuthMiddleware");

dotenv.config({
  path: __dirname + "/config.env",
});

const port = process.env.PORT || 3030;

async function startServer() {
  const app = express();

  await initDB();

  app.use(cors());
  app.use(express.json());
  app.use(cookieParser());
  app.use(isAuth);

  app.use(router);

  app.listen(port, () => console.log(`Server listening on port ${port}...`));
}

startServer();
