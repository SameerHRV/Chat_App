import { v2 as cloudinary } from "cloudinary";
import { config } from "../config/config.js";
import { v4 as uuid } from "uuid";
import { base64ToFile } from "../helper/helper.js";

cloudinary.config({
  cloud_name: config.cloudinary.cloudinaryName,
  api_key: config.cloudinary.cloudinaryApiKey,
  api_secret: config.cloudinary.cloudinaryApiSecret,
});

export const uploadToCloudinary = async (localFilePath = []) => {
  try {
    const uploadPromises = localFilePath.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          base64ToFile(file),
          {
            public_id: uuid(),
            folder: "avatars",
            resource_type: "auto",
          },
          (err, result) => {
            if (err) {
              reject(err);
            } else {
              resolve(result);
            }
          },
        );
      });
    });
    try {
      const uploadedFiles = await Promise.all(uploadPromises);
      const uploadedFile = uploadedFiles.map((file) => ({
        public_id: file.public_id,
        url: file.secure_url,
      }));
      return uploadedFile;
    } catch (error) {
      console.log(error);
    }
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteFileFromCloudinary = async (public_ids) => {
  console.log(public_ids);
};
