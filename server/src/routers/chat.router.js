import { Router } from "express";
import {
  addMember,
  deleteChat,
  getChat,
  getChatDetails,
  getMessages,
  getMyGroups,
  leaveGroup,
  newGroupChats,
  removeMembers,
  renameGroup,
  sendAttachment,
} from "../controllers/chat.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { JWTVerify } from "../middlewares/userAuth.middleware.js";
import {
  addMemberValidator,
  chatIdValidator,
  newGroupValidator,
  removeMemberValidator,
  renameValidator,
  sendAttachmentsValidator,
  validateHandler,
} from "../utils/express.validator.js";

const chatRouter = Router();

chatRouter.use(JWTVerify);

chatRouter.post("/new-group", newGroupValidator(), validateHandler, newGroupChats);
chatRouter.get("/get-chat", getChat);
chatRouter.get("/my/groups", getMyGroups);
chatRouter.put("/add-member", addMemberValidator(), validateHandler, addMember);
chatRouter.put("/remove-member", removeMemberValidator(), validateHandler, removeMembers);
chatRouter.delete("/leave/:id", chatIdValidator(), validateHandler, leaveGroup);
chatRouter.post(
  "/message",
  sendAttachmentsValidator(),
  validateHandler,
  upload.array("files", 5),
  sendAttachment,
);
chatRouter.get("/message/:id", chatIdValidator(), validateHandler, getMessages);

// Method Chaining
chatRouter
  .route("/:id")
  .get(chatIdValidator(), validateHandler, getChatDetails)
  .put(renameValidator(), validateHandler, renameGroup)
  .delete(chatIdValidator(), validateHandler, deleteChat);

export default chatRouter;
