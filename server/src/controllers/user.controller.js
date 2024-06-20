import { NEW_REQUEST, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../helper/helper.js";
import { Chat } from "../models/chat.model.js";
import { Request } from "../models/request.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiRespons.js";
import { emitEvents } from "../utils/features.js";
import { generateAccessAndRefreshToken, options } from "../utils/generateAccessAndRefreshToken.js";
import { globalAsyncHandler } from "../utils/globalAsyncHandler.js";

const registerUser = globalAsyncHandler(async (req, res) => {
  const { name, username, bio, email, password } = req.body;
  if ([name, email, username, password, bio].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (user) {
    throw new ApiError(400, "User already exists");
  }

  const avatar = {
    public_id: "123",
    url: "https://www.w3schools.com/howto/img_avatar.png",
  };

  const newUser = await User.create({
    name: name.toLowerCase(),
    username: username.toLowerCase(),
    bio,
    email,
    password,
    avatar,
  });

  const { accessToken } = await generateAccessAndRefreshToken(newUser._id);

  const createUser = await User.findById(newUser._id).select("-password");

  res
    .status(201)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200, {
        createUser,
        message: "User created successfully",
      }),
    );
});

const loginUser = globalAsyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const user = await User.findOne({
    $or: [{ email }, { username }],
  });

  if (!user) {
    throw new ApiError(400, "User not found");
  }

  const isValidPassword = await user.comparePassword(password);

  if (!isValidPassword) {
    throw new ApiError(400, "Invalid password");
  }

  const createUser = await User.findById(user._id).select("-password");

  const { accessToken } = await generateAccessAndRefreshToken(user._id);

  res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(200, {
        createUser,
        message: "User logged in successfully",
      }),
    );
});

const logoutUser = globalAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res
    .status(200)
    .clearCookie("accessToken")
    .json(
      new ApiResponse(200, {
        user,
        message: "User logged out successfully",
      }),
    );
});

const getUser = globalAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.json(
    new ApiResponse(200, {
      user,
      message: "User details fetched successfully",
    }),
  );
});

const searchUser = globalAsyncHandler(async (req, res) => {
  const { name } = req.query;

  const chat = await Chat.find({
    groupChat: false,
    members: req.user._id,
  });

  const allUsersFromMyChat = chat.flatMap((chat) => chat.members);

  const allUsersExceptMeAndFriends = await User.find({
    _id: {
      $nin: allUsersFromMyChat,
    },
    name: {
      $regex: name,
      $options: "i",
    },
  });

  const users = allUsersExceptMeAndFriends.map(({ _id, name, avatar }) => ({
    _id,
    name,
    avatar: avatar.url,
  }));

  res.status(200).json(new ApiResponse(200, users));
});

const sendFriendRequest = globalAsyncHandler(async (req, res) => {
  const { userId } = req.body;

  const request = await Request.findOne({
    $or: [
      { sender: req.user._id, receiver: userId },
      { sender: userId, receiver: req.user._id },
    ],
  });

  if (request) {
    throw new ApiError(400, "Friend request already sent");
  }

  await Request.create({
    sender: req.user._id,
    receiver: userId,
  });

  emitEvents(req, NEW_REQUEST, [userId]);

  res.status(200).json(new ApiResponse(200, "Friend request sent successfully"));
});

const acceptFriendRequest = globalAsyncHandler(async (req, res) => {
  const { requestId, accept } = req.body;

  const request = await Request.findById(requestId)
    .populate("sender", "name")
    .populate("receiver", "name");

  if (!request) {
    throw new ApiError(400, "Friend request not found");
  }

  if (request.receiver._id.toString() !== req.user._id.toString()) {
    throw new ApiError(400, "You are not the receiver of the friend request");
  }

  if (!accept) {
    await Request.deleteOne();
    throw new ApiError(400, "Friend request not accepted");
  }

  const members = [request.sender._id, request.receiver._id];

  await Promise.all([
    Chat.create({ members, name: `${request.sender.name} - ${request.receiver.name}` }),
    request.deleteOne(),
  ]);

  emitEvents(req, REFETCH_CHATS, members);

  res.status(200).json({
    success: true,
    message: "Friend request accepted successfully",
    senderId: request.sender._id,
  });
});

const getAllNotifications = globalAsyncHandler(async (req, res) => {
  const request = await Request.find({
    receiver: req.user._id,
  }).populate("sender", "name avatar");

  const allRequest = request.map(({ sender, _id }) => ({
    _id,
    sender: {
      _id: sender?._id,
      name: sender?.name,
      avatar: sender?.avatar?.url,
    },
  }));

  res.status(200).json(new ApiResponse(200, allRequest));
});

const getMyFriends = globalAsyncHandler(async (req, res) => {
  const chatId = req.query.chatId;

  const chats = await Chat.find({ members: req.user._id, groupChat: false }).populate(
    "members",
    "name avatar",
  );

  const friends = chats.map(({ members }) => {
    const otherUser = getOtherMember(members, req.user._id);

    return {
      _id: otherUser?._id,
      name: otherUser?.name,
      avatar: otherUser?.avatar?.url,
    };
  });

  if (chatId) {
    const chat = await Chat.findById(chatId);
    const availabeFriends = friends.filter((friend) => !chat.members.includes(friend._id));
    return res.status(200).json(new ApiResponse(200, availabeFriends));
  } else {
    return res.status(200).json(new ApiResponse(200, friends));
  }
});

export {
  acceptFriendRequest,
  getAllNotifications,
  getMyFriends,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
  searchUser,
  sendFriendRequest,
};
