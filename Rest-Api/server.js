const express = require("express");
const dotenv = require("dotenv");

const { initDB } = require("./config/database");
const expressConfig = require("./config/express");

dotenv.config({
  path: __dirname + "/config.env",
});

const port = process.env.PORT || 3000;

async function startServer() {
  const app = express();

  await initDB();

  app.use(express.json());

  app.listen(port, () => console.log(`Server listening on port ${port}...`));
}

startServer();
