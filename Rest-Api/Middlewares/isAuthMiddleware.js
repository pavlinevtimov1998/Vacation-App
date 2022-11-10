const { catchAsyncError } = require("../Util/errorParser");
const { verifyToken } = require("../util/jwtConfig");

exports.isAuth = async (req, res, next) => {
  const token = req.cookies[process.env.COOKIE_NAME];

  if (!token) {
    return next();
  }

  try {
    const payload = await verifyToken(token);

    if (!payload) {
      return next();
    }

    if (payload.agencyName) {
      req.agency = payload;
    } else {
      req.user = payload;
    }
  } catch (err) {
    res.clearCookie(process.env.COOKIE_NAME);
    res.status(401).json({});
  }
};
