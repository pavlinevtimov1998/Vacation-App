exports.isUser = () => (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/auth/login");
  }
};

exports.isGuest = () => (req, res, next) => {
  if (req.user) {
    res.redirect("/");
  } else {
    next();
  }
};
