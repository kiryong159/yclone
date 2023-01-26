export const loacalsmiddelware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Yclone";
  res.locals.user = req.session.user;
  console.log(res.locals);
  next();
};

// local은 res 이고 session 은 req 임
// local 을 사용할때 res.locals.siteName 이렇게안쓰고 #{siteName}만  사용함.
