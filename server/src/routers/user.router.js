import { Router } from "express";
import {
  acceptFriendRequest,
  getAllNotifications,
  getMyFriends,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  searchUser,
  sendFriendRequest,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { JWTVerify } from "../middlewares/userAuth.middleware.js";
import {
  acceptRequestValidator,
  loginValidator,
  registerValidator,
  sendRequestValidator,
  validateHandler,
} from "../utils/express.validator.js";

const userRouter = Router();

userRouter.post(
  "/register",
  upload.single("avatar"),
  registerValidator(),
  validateHandler,
  registerUser,
);
userRouter.post("/login", loginValidator(), validateHandler, loginUser);

userRouter.get("/user-profile", JWTVerify, getUser);
userRouter.post("/logout", JWTVerify, logoutUser);
userRouter.get("/search", JWTVerify, searchUser);
userRouter.put(
  "/friend-request",
  sendRequestValidator(),
  validateHandler,
  JWTVerify,
  sendFriendRequest,
);
userRouter.put(
  "/accept-friend-request",
  acceptRequestValidator(),
  validateHandler,
  JWTVerify,
  acceptFriendRequest,
);
userRouter.get("/notifications", JWTVerify, getAllNotifications);
userRouter.get("/friends", JWTVerify, getMyFriends);
export default userRouter;
