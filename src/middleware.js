import multer from "multer";

export const loacalsmiddelware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.siteName = "Yclone";
  res.locals.loggedInuser = req.session.user || {};
  next();
};

// local은 res 이고 session 은 req 임
// local 을 pug 사용할때 res.locals.siteName 이렇게안쓰고 #{siteName}만  사용함.
// 아무데서나 사용할려면 req.session.~~해야하는듯??

export const ProtectMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/");
  }
};

export const PublicMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
  }
  return res.redirect("/");
};

export const avatarUploadMiddleware = multer({
  dest: `uploads/avatars`,
  limits: { fileSize: 1500000 },
});
export const videoUploadMiddleware = multer({
  dest: `uploads/videos`,
  limits: { fileSize: 10000000 },
});
