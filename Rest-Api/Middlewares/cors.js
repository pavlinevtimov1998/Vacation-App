module.exports = (origin) => (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "HEAD, OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, X-Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
};
