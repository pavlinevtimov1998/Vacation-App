exports.isUser = () => (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized!", status: 401 });
  }
};

exports.isGuest = () => (req, res, next) => {
  if (req.user || req.agency) {
    res.status(404).json({ message: "Not Found!", status: 404 });
  } else {
    next();
  }
};

exports.isAgency = () => (req, res, next) => {
  if (req.agency) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized!", status: 401 });
  }
};

exports.isAccount = () => (req, res, next) => {
  if (req.agency || req.user) {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized!", status: 401 });
  }
};
