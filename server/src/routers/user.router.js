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
  upload.fields([{ name: "avatar", maxCount: 1 }]),
  registerValidator(),
  validateHandler,
  registerUser,
);
userRouter.post("/login", loginValidator(), validateHandler, loginUser);

// *secure routes
userRouter.use(JWTVerify);
userRouter.get("/user-profile", getUser);
userRouter.get("/logout", logoutUser);
userRouter.get("/search", searchUser);
userRouter.put("/friend-request", sendRequestValidator(), validateHandler, sendFriendRequest);
userRouter.put(
  "/accept-friend-request",
  acceptRequestValidator(),
  validateHandler,
  acceptFriendRequest,
);
userRouter.get("/notifications", getAllNotifications);
userRouter.get("/friends", getMyFriends);
export default userRouter;
