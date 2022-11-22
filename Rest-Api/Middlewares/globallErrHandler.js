exports.globalErrorHandler = (err, req, res, next) => {
  console.log(err, 'From global error handler!');
  res.status(err.status).json({
    message: err.message,
  });
};
