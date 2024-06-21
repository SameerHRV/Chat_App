import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { createServer } from "http";
import morgan from "morgan";
import { Server } from "socket.io";
import { v4 as uuid } from "uuid";
import { NEW_MESSAGE, NEW_MESSAGE_ALERT } from "./constants/events.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.middleware.js";
import adminRouter from "./routers/admin.route.js";
import chatRouter from "./routers/chat.router.js";
import userRouter from "./routers/user.router.js";
import { faker } from "@faker-js/faker";
import { getSockets } from "./helper/helper.js";
import { Message } from "./models/message.model.js";

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

export const userIDs = new Map();

// io.use((socket, next) => {});

io.on("connection", (socket) => {
  const tempUser = {
    _id: uuid(),
    name: faker.person.fullName(),
  };
  userIDs.set(socket.id, tempUser._id.toString());
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

    const usersSockets = getSockets(members);
    io.to(usersSockets).emit(NEW_MESSAGE, {
      chatId,
      messages: messageForRealTime,
    });
    io.to(usersSockets).emit(NEW_MESSAGE_ALERT, {
      chatId,
    });
    try {
      await Message.create(messageForDb);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
    userIDs.delete(socket.id);
  });
});

app.use(globalErrorHandler);
export default app;
