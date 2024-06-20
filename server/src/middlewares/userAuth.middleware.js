import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { ApiError } from "../utils/ApiError.js";
import { globalAsyncHandler } from "../utils/globalAsyncHandler.js";

export const JWTVerify = globalAsyncHandler(async (req, res, next) => {
  try {
    const token = req.cookies.accessToken || req.header("Authorization").replace("Bearer ", "");

    if (!token) throw new ApiError(401, "The token is missing, invalid or has been expired");

    const decoded = jwt.verify(token, config.jwt.accessTokenSecret);

    req.user = decoded;
    next();
  } catch (error) {
    throw new ApiError(401, "The token is missing, invalid or has been expired", error.message);
  }
});
