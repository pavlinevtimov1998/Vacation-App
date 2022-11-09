const { catchAsyncError } = require("../Util/errorParser");
const { verifyToken } = require("../util/jwtConfig");

exports.isAuth = catchAsyncError(async (req, res, next) => {
  const token = req.cookies[process.env.COOKIE_NAME];

  if (!token) {
    return next();
  }

  const payload = await verifyToken(token);

  if (!payload) {
    return next();
  }

  if (payload.agencyName) {
    req.agency = payload;
  } else {
    req.user = payload;
  }

  next();
});
