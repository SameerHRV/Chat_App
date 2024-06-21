import { v2 as cloudinary } from "cloudinary";
import { config } from "../config/config.js";
import { v4 as uuid } from "uuid";
import { ApiError } from "./ApiError.js";
import fs from "fs";

cloudinary.config({
  cloud_name: config.cloudinary.cloudinaryName,
  api_key: config.cloudinary.cloudinaryApiKey,
  api_secret: config.cloudinary.cloudinaryApiSecret,
});

export async function uploadToCloudinary(localFilePath) {
  try {
    // Upload an image
    const uploadResult = await cloudinary.uploader
      .upload(localFilePath, {
        public_id: uuid(),
        folder: "images",
        resource_type: "auto",
      })
      .catch((error) => {
        console.log(error);
      });

    const public_id = uploadResult.public_id;
    const url = uploadResult.secure_url;

    return [
      {
        public_id,
        url,
      },
    ];
  } catch (error) {
    fs.unlinkSync(localFilePath);
    throw new ApiError(500, "Error uploading image to cloudinary", error);
  }
}

export const deleteFileFromCloudinary = async (public_ids) => {
  console.log(public_ids);
};
