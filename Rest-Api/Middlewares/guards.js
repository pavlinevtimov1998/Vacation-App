exports.isUser = () => (req, res, next) => {
  if (req.user || req.business) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized!", status: 401 });
  }
};

exports.isGuest = () => (req, res, next) => {
  if (req.user || req.business) {
    res.status(404).json({ message: "Not Found!", status: 404 });
  } else {
    next();
  }
};
