import jwt from "jsonwebtoken";
import { config } from "../config/config.js";

export const AdminAuth = (req, res, next) => {
  const token = req.cookies["adminToken"] || req.header["Authorization"].replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const scaretKey = jwt.verify(token, config.adminSecretKey);
  const adminSecretKey = config.adminSecretKey || "Sameer";

  const isMatch = scaretKey === adminSecretKey;
  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  next();
};
