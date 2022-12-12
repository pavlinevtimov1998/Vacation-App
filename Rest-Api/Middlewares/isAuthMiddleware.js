const config = require("../config/config");
const { verifyToken } = require("../Util/jwtConfig");

exports.isAuth = async (req, res, next) => {
  const token = req.cookies[config.COOKIE_NAME];

  if (!token) {
    return next();
  }

  try {
    const payload = await verifyToken(token);

    if (!payload) {
      return next();
    }

    if (payload.isAgency) {
      req.agency = payload;
    } else {
      req.user = payload;
    }
    next();
  } catch (err) {
    res.clearCookie(config.COOKIE_NAME);
    res.status(401).json({ message: "Token expired!" });
  }
};
