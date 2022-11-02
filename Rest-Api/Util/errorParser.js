exports.catchAsyncError = function (func) {
  return (req, res, next) => {
    func(req, res, next).catch((err) => {
      if (err.name == "CastError") {
        return next({ message: "Not Found!", status: 404 });
      } else if (err.code == "11000") {
        const message = handleDuplicateError(err);

        return next({ message, status: 400 });
      } else if (err.name == "ValidationError") {
        const message = handleValidationError(err);

        return next({ message, status: 400 });
      } else if (err.message == "Token expired!") {
        res.clearCookie(process.env.COOKIE_NAME);
        return next({ message: "Unauthorized!", status: 401 });
      } else {
        return next(err);
      }
    });
  };
};

const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  return `Incorrect input. ${errors.join(". ")}`;
};

const handleDuplicateError = (err) => {
  let matched = err.errmsg.match(/(["'])(?:\\.|[^\\])*?\1/);
  let value;

  if (matched) {
    value = matched[0];
  }

  return `Cannot duplicate this ${value}. Please try with different!`;
};
