import multer from "multer";

export const upload = multer({
  limits: {
    fileSize: 1024 * 1024 * 10, // 10 MB
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
});
