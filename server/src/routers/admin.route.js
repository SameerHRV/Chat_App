import { Router } from "express";
import {
  adminLogin,
  adminLogout,
  allChats,
  allMessages,
  allUsers,
  getAdminData,
  getDashboardData,
} from "../controllers/admin.controller.js";
import { adminLoginValidator, validateHandler } from "../utils/express.validator.js";
import { AdminAuth } from "../middlewares/adminAuth.middleware.js";

const adminRouter = Router();

adminRouter.post("/adminLogin", adminLoginValidator(), validateHandler, adminLogin);
adminRouter.post("/adminLogout", adminLogout);

adminRouter.use(AdminAuth);
// only Admin can see all users
adminRouter.get("/data", getAdminData);
adminRouter.get("/allUsers", allUsers);
adminRouter.get("/allChats", allChats);
adminRouter.get("/allMessages", allMessages);
adminRouter.get("/dashboardData", getDashboardData);

export default adminRouter;
