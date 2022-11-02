const express = require("express");
const dotenv = require("dotenv");

const { initDB } = require("./config/database");
const router = require("./router");

dotenv.config({
  path: __dirname + "/config.env",
});

const port = process.env.PORT || 3030;

async function startServer() {
  const app = express();

  await initDB();
  
  app.use(express.json());

  app.use(router);

  app.listen(port, () => console.log(`Server listening on port ${port}...`));
}

startServer();
