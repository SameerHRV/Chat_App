import { config as dotenvConfig } from "dotenv";

dotenvConfig({
  path: "./.env",
});

const _config = {
  port: process.env.PORT || 5000,
  cors: process.env.CORS || "*",
  env: process.env.NODE_ENV,
  adminSecretKey: process.env.ADMIN_SECRET_KEY,
  mongoDB: {
    uri: process.env.MONGODB_URI,
    database: process.env.MONGODB_DATABASE,
  },
  jwt: {
    accessTokenSecret: process.env.JWT_ACCESSTOKEN_SECRET,
    accessTokenExpiresIn: process.env.JWT_ACCESSTOKEN_EXPIRES_IN,
  },
  cloudinary: {
    cloudinaryName: process.env.CLOUDINARY_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
  },
};

export const config = Object.freeze(_config);
