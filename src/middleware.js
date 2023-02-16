import multer from "multer";
import multerS3 from "multer-s3";
import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRETS,
  },
});

const multerUploader = multerS3({
  s3: s3,
  bucket: "ggrongsyclone",
  acl: "public-read",
});

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
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};

export const PublicMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    req.flash("error", "Not authorized");
    return res.redirect("/");
  }
};

export const avatarUploadMiddleware = multer({
  dest: `uploads/avatars`,
  limits: { fileSize: 1500000 },
  storage: multerUploader,
});
export const videoUploadMiddleware = multer({
  dest: `uploads/videos`,
  limits: { fileSize: 10000000 },
  storage: multerUploader,
});
