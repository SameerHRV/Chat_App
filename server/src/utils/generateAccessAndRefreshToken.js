import { ApiError } from "./ApiError.js";
import { User } from "../models/user.model.js";

export const options = {
  httpOnly: true,
  secure: true,
};

export const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(401, "User not found");

    const accessToken = user.generateAccessToken();

    await user.save({
      validateBeforeSave: false,
    });
    return {
      accessToken,
    };
  } catch (error) {
    const errMessage = ApiError(
      500,
      "Something went wrong while generating the token",
      error.message,
    );
    throw errMessage;
  }
};
