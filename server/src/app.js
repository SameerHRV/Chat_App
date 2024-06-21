import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import morgan from "morgan";
import { Server } from "socket.io";
import { v4 as uuid } from "uuid";
import { NEW_MESSAGE } from "./constants/events.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.middleware.js";
import adminRouter from "./routers/admin.route.js";
import chatRouter from "./routers/chat.router.js";
import userRouter from "./routers/user.router.js";
import { faker } from "@faker-js/faker";

const app = express();
export const server = createServer(app);
const io = new Server(server, {});

app.use(morgan("dev"));

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
app.use(
  express.json({
    limit: "50mb",
    extended: true,
  }),
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  }),
);

app.use(cookieParser());

app.use(express.static("public"));

app.use("/api/v1/users", userRouter);
app.use("/api/v1/chats", chatRouter);
app.use("/api/v1/admin", adminRouter);

io.on("connection", (socket) => {
  const tempUser = {
    _id: uuid(),
    name: faker.person.fullName(),
  };
  console.log("User connected", socket.id);

  socket.on(NEW_MESSAGE, async ({ chatId, members, messages }) => {
    const messageForRealTime = {
      content: messages,
      _id: uuid(),
      sender: {
        _id: tempUser._id,
        name: tempUser.name,
      },
      chat: chatId,
      createdAt: new Date().toISOString(),
    };

    const messageForDb = {
      content: messages,
      sender: tempUser._id,
      chat: chatId,
    };
    console.log("New message", messageForRealTime);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use(globalErrorHandler);
export default app;
