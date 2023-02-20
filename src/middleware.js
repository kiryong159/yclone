import multer from "multer";
import multerS3 from "multer-s3";
import Video from "../src/models/Video";
import {
  S3Client,
  DeleteObjectCommand,
  DeleteObjectsCommand,
} from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "ap-northeast-1",
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRETS,
  },
});

const s3ImageUploader = multerS3({
  s3: s3,
  bucket: `ggrongsyclone`,
  acl: "public-read",
  key: function (req, file, cb) {
    const newfilename = Date.now() + "-" + "avatar";
    const fullpath = "images/" + newfilename;
    cb(null, fullpath);
  },
});

const s3FileUploader = multerS3({
  s3: s3,
  bucket: "ggrongsyclone",
  acl: "public-read",
  key: function (req, file, cb) {
    const newfilename = Date.now() + "-" + "Video";
    const fullpath = "videos/" + newfilename;
    cb(null, fullpath);
  },
});

export const avatardeleteMiddleware = async (req, res, next) => {
  if (!req.file) {
    console.log("!req.file");
    return next();
  }
  const key = `images/${req.session.user.avatarUrl.split("/")[4]}`;
  const params = {
    Bucket: "ggrongsyclone",
    Key: key,
  };
  try {
    const data = await s3.send(new DeleteObjectCommand(params));
    console.log("Success. Object deleted.", data);
  } catch (err) {
    console.log("Error", err);
    return res.redirect("/user/edit");
  }
  next();
};

export const videodeleteMiddleware = async (req, res, next) => {
  const nowvideo = await Video.findById(req.params.id);
  console.log(nowvideo);
  const key = `videos/${nowvideo.fileUrl.split("/")[4]}`;
  const thumbkeyyy = `videos/${nowvideo.thumbUrl.split("/")[4]}`;
  const params = {
    Bucket: "ggrongsyclone",
    Delete: { Objects: [{ Key: key }, { Key: thumbkeyyy }] },
  };
  console.log(params);
  try {
    const data = await s3.send(new DeleteObjectsCommand(params));
    console.log("Success. Object deleted.", data);
  } catch (err) {
    console.log("Error", err);
    return res.redirect("/");
  }
  next();
};

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

const isFly = process.env.NODE_ENV === "production";
// process.env.NODE_ENV 는  fly heroku 같은 웹사이트에서만 production 상태이기때문에 웹에있는지 로컬에있는지 확인이 가능함
//storage: isFly ? s3FileUploader : undefined, 이런식으로 사용
export const avatarUploadMiddleware = multer({
  dest: `uploads/avatars`,
  limits: { fileSize: 1500000 },
  storage: s3ImageUploader,
});
export const videoUploadMiddleware = multer({
  dest: `uploads/videos`,
  limits: { fileSize: 10000000 },
  storage: s3FileUploader,
});
