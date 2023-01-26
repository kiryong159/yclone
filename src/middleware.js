export const loacalsmiddelware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Yclone";
  res.locals.user = req.session.user;
  console.log(res.locals);
  next();
};
