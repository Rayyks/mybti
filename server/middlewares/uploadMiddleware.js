// /middlewares/uploadMiddleware.js
import multer from "multer";
import path from "path";

// File storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`);
  },
});

// File filter
const fileFilter = (req, file, cb) => {
  const allowedImageTypes = /jpeg|jpg|png|gif/;
  const allowedVideoTypes = /mp4|mkv|avi|mov/;
  const extname = path.extname(file.originalname).toLowerCase();
  const mimetype = file.mimetype.toLowerCase();

  console.log(`File being uploaded: ${file.originalname}`);

  if (allowedImageTypes.test(extname) && allowedImageTypes.test(mimetype)) {
    cb(null, true);
  } else if (
    allowedVideoTypes.test(extname) &&
    allowedVideoTypes.test(mimetype)
  ) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only images and videos are allowed."));
  }
};

// Upload handler
export const uploadMiddleware = multer({
  storage,
  limits: { fileSize: 20 * 1024 * 1024 },
  fileFilter,
});
