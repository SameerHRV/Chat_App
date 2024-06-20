import jwt from "jsonwebtoken";
import { config } from "../config/config.js";
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { options } from "../utils/generateAccessAndRefreshToken.js";
import { globalAsyncHandler } from "../utils/globalAsyncHandler.js";
const adminLogin = globalAsyncHandler(async (req, res) => {
  const { secretKey } = req.body;

  const adminSecretKey = config.adminSecretKey || "Sameer";

  const isMatch = adminSecretKey === secretKey;

  if (!isMatch) {
    return res.status(401).json({
      success: false,
      message: "Invalid Secret Key",
    });
  }

  const token = jwt.sign(secretKey, config.adminSecretKey);

  res
    .status(200)
    .cookie("adminToken", token, {
      ...options,
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    })
    .json({
      success: true,
      message: "Admin Login",
    });
});

const adminLogout = globalAsyncHandler(async (req, res) => {
  res.clearCookie("adminToken");
  res.status(200).json({
    success: true,
    message: "Logout Successfully",
  });
});

const getAdminData = globalAsyncHandler(async (req, res) => {
  return res.status(200).json({
    admin: true,
  });
});

const allUsers = globalAsyncHandler(async (req, res) => {
  const users = await User.find({});

  const transformedUsers = await Promise.all(
    users.map(async ({ name, username, avatar, _id }) => {
      const [groups, friends] = await Promise.all([
        Chat.countDocuments({ groupChat: true, members: _id }),
        Chat.countDocuments({ groupChat: false, members: _id }),
      ]);

      return {
        name,
        username,
        avatar: avatar.url,
        _id,
        groups,
        friends,
      };
    }),
  );

  res.status(200).json({
    success: true,
    message: "All users",
    data: transformedUsers,
  });
});

const allChats = globalAsyncHandler(async (req, res) => {
  const chats = await Chat.find({})
    .populate("members", "name avatar")
    .populate("creator", "name avatar");

  const transformedChats = await Promise.all(
    chats.map(async ({ members, _id, groupChat, name, creator }) => {
      const totalMessages = await Message.countDocuments({ chat: _id });
      return {
        _id,
        groupChat,
        name,
        avatar: members.slice(0, 3).map(({ avatar }) => avatar.url),
        members: members.map(({ name, _id, avatar }) => ({
          name,
          _id,
          avatar: avatar.url,
        })),
        creator: {
          name: creator?.name || "Anonymous",
          avatar: creator?.avatar.url || "",
        },
        totleMembers: members.length,
        totalMessages,
      };
    }),
  );

  res.status(200).json({
    success: true,
    message: "All chats",
    data: transformedChats,
  });
});

const allMessages = globalAsyncHandler(async (req, res) => {
  const messages = await Message.find({})
    .populate("sender", "name avatar")
    .populate("chat", "groupChat");

  const transformedMessages = messages.map(
    ({ content, attachments, _id, sender, createdAt, chat }) => ({
      _id,
      attachments,
      content,
      createdAt,
      chat: chat._id,
      groupChat: chat.groupChat,
      sender: {
        _id: sender?._id,
        name: sender?.name,
        avatar: sender?.avatar?.url,
      },
    }),
  );

  res.status(200).json({
    success: true,
    message: "All messages",
    data: transformedMessages,
  });
});

const getDashboardData = globalAsyncHandler(async (req, res) => {
  const [groupsCount, userscount, messagesCount, totalChatCount] = await Promise.all([
    await Chat.countDocuments({ groupChat: true }),
    await User.countDocuments(),
    await Message.countDocuments(),
    await Chat.countDocuments(),
  ]);

  const today = new Date();

  const lastSevenDays = new Date();
  lastSevenDays.setDate(lastSevenDays.getDate() - 7);

  const lastSevenDaysMessages = await Message.find({
    createdAt: {
      $gte: lastSevenDays,
      $lte: today,
    },
  }).select("createdAt");

  const messages = new Array(7).fill(0);

  lastSevenDaysMessages.forEach((message) => {
    const index = (today.getTime() - message.createdAt.getTime()) / (1000 * 60 * 60 * 24);
    const day = Math.floor(index);

    messages[6 - day] += 1;
  });

  const stats = {
    groupsCount,
    userscount,
    messagesCount,
    totalChatCount,
    messagesChart: messages,
  };

  res.status(200).json({
    success: true,
    message: "Dashboard Data",
    data: stats,
  });
});

export { adminLogin, adminLogout, allChats, allMessages, allUsers, getAdminData, getDashboardData };
