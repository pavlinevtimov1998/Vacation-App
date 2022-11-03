const { verifyToken } = require("../util/jwtConfig");

exports.isAuth = async (req, res, next) => {
  const token = req.cookies[process.env.COOKIE_NAME];

  if (!token) {
    return next();
  }

  const payload = await verifyToken(token);

  if (!payload) {
    return next();
  }

  if (payload.isCompany) {
    req.business = payload;
  } else {
    req.user = payload;
  }

  next();
};
