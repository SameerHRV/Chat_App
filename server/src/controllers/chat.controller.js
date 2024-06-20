import { ALERT, NEW_ATTACHMENT, NEW_MESSAGE_ALERT, REFETCH_CHATS } from "../constants/events.js";
import { getOtherMember } from "../helper/helper.js";
import { Chat } from "../models/chat.model.js";
import { Message } from "../models/message.model.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiRespons.js";
import { deleteFileFromCloudinary } from "../utils/cloudinary.js";
import { emitEvents } from "../utils/features.js";
import { globalAsyncHandler } from "../utils/globalAsyncHandler.js";

const newGroupChats = globalAsyncHandler(async (req, res) => {
  const { name, members } = req.body;

  if (members.length < 2) {
    throw new ApiError(400, "Members should be atleast 2");
  }

  const allMembers = [...members, req.user._id];

  const chatGroup = await Chat.create({
    name,
    groupChat: true,
    creator: req.user._id,
    members: allMembers,
  });

  emitEvents(req, ALERT, allMembers, `${name} Group Created`);
  emitEvents(req, REFETCH_CHATS, members, `${name} Group Created`);

  res.status(200).json(new ApiResponse(200, chatGroup, "Chat Group Created"));
});

const getChat = globalAsyncHandler(async (req, res) => {
  const chats = await Chat.find({ members: req.user._id }).populate("members", "name avatar");

  const otherMember = getOtherMember(chats, req.user._id);

  const transformdChats = chats.map(({ _id, groupChat, name, members }) => {
    return {
      _id,
      groupChat,
      avatar: groupChat
        ? members.slice(0, 4).map(({ avatar }) => avatar.url)
        : [otherMember.avatar.url],
      name: groupChat ? name : otherMember.name,
      members: members.reduce((prev, curr) => {
        if (curr._id.toString() !== req.user._id.toString()) {
          prev.push(curr._id);
        }
        return prev;
      }, []),
    };
  });

  res.status(200).json(new ApiResponse(200, transformdChats, "Chats"));
});

const getMyGroups = globalAsyncHandler(async (req, res) => {
  const chat = await Chat.find({
    members: req.user._id,
    groupChat: true,
    creator: req.user._id,
  }).populate("members", "name avatar");

  const groups = chat.map(({ _id, name, members, groupChat }) => ({
    _id,
    name,
    groupChat,
    avatar: members.slice(0, 4).map(({ avatar }) => avatar.url),
  }));

  return res.status(200).json(new ApiResponse(200, groups, "Groups"));
});

const addMember = globalAsyncHandler(async (req, res) => {
  const { chatId, members } = req.body;

  if (!members || members.length < 1) {
    throw new ApiError(400, "Please provide members");
  }

  const chat = await Chat.findById(chatId);

  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }

  if (!chat.groupChat) {
    throw new ApiError(400, "This is not a group chat");
  }

  if (chat.creator.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You can't add yourself to a group chat");
  }

  const allNewMembersPromises = members.map((i) => User.findById(i, "name"));

  const allNewMembers = await Promise.all(allNewMembersPromises);

  const uniqueMembers = allNewMembers
    .filter((i) => !chat.members.includes(i._id.toString()))
    .map((i) => i._id);

  chat.members.push(...uniqueMembers);

  if (chat.members.length > 100) {
    throw new ApiError(400, "Maximum members limit reached");
  }
  await chat.save();

  const allUserName = allNewMembers.map((i) => i.name).join(", ");

  emitEvents(req, ALERT, chat.members, `${allUserName} added to Group`);
  emitEvents(req, REFETCH_CHATS, chat.members);

  return res
    .status(200)
    .json(new ApiResponse(200, allUserName, "Member Added to Group successfully"));
});

const removeMembers = globalAsyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  const [chat, user] = await Promise.all([Chat.findById(chatId), User.findById(userId, "name")]);

  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }

  if (!chat.groupChat) {
    throw new ApiError(400, "This is not a group chat");
  }

  if (chat.creator.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You can't add yourself to a group chat");
  }

  if (chat.members.length <= 3) {
    throw new ApiError(400, "Maximum members limit reached");
  }

  chat.members = chat.members.filter((i) => i.toString() !== userId.toString());

  await chat.save();

  emitEvents(req, ALERT, chat.members, `${user.name} removed from Group`);
  emitEvents(req, REFETCH_CHATS, chat.members);

  return res
    .status(200)
    .json(new ApiResponse(200, user.name, "Member Removed from Group successfully"));
});

const leaveGroup = globalAsyncHandler(async (req, res) => {
  const chatId = req.params.id;

  const chat = await Chat.findById(chatId);

  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }

  if (!chat.groupChat) {
    throw new ApiError(400, "This is not a group chat");
  }

  const remainingMembers = chat.members.filter((i) => i.toString() !== req.user._id.toString());

  if (remainingMembers.length <= 3) {
    throw new ApiError(400, "Maximum members limit reached");
  }

  if (chat.creator.toString() === req.user._id.toString()) {
    const randomMember = Math.floor(Math.random() * remainingMembers.length);
    const newCreator = remainingMembers[randomMember];

    chat.creator = newCreator;
  }

  chat.members = remainingMembers;

  const [user] = await Promise.all([User.findById(req.user._id, "name"), chat.save()]);

  emitEvents(req, ALERT, chat.members, `${user.name} removed from Group`);
  emitEvents(req, REFETCH_CHATS, user.members);

  return res.status(200).json(new ApiResponse(200, user.name, "Group left successfully"));
});

const sendAttachment = globalAsyncHandler(async (req, res) => {
  const { chatId } = req.body;

  const [chat, user] = await Promise.all([
    Chat.findById(chatId),
    User.findById(req.user._id, "name"),
  ]);

  if (!chat || !user) {
    throw new ApiError(404, "Chat and User not found");
  }

  const files = req.file || [];

  if (!files.length < 1) {
    throw new ApiError(400, "Please provide files");
  }

  // upload files to cloudinary
  const attachments = [];

  const messageForDB = {
    constent: "",
    attachments,
    sender: user._id,
    chat: chatId,
  };

  const messageForRealTime = {
    ...messageForDB,
    sender: {
      _id: user._id,
      name: user.name,
    },
  };

  const message = await Message.create(messageForDB);

  emitEvents(req, NEW_ATTACHMENT, chat.members, {
    message: messageForRealTime,
    chatId,
  });

  emitEvents(req, NEW_MESSAGE_ALERT, chat.members, {
    chatId,
  });

  res.status(200).json(new ApiResponse(200, message, "Attachment sent successfully"));
});

const getChatDetails = globalAsyncHandler(async (req, res) => {
  if (req.query.populate === "true") {
    const chat = await Chat.findById(req.params.id).populate("members", "name avatar").lean();

    if (!chat) {
      throw new ApiError(404, "Chat not found");
    }

    chat.members = chat.members.map(({ _id, name, avatar }) => ({
      _id,
      name,
      avatar: avatar.url,
    }));

    res.status(200).json(new ApiResponse(200, chat, "Chat Details"));
  } else {
    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      throw new ApiError(404, "Chat not found");
    }

    res.status(200).json(new ApiResponse(200, chat, "Chat Details"));
  }
});

const renameGroup = globalAsyncHandler(async (req, res) => {
  const chatId = req.params.id;
  const { name } = req.body;

  const chat = await Chat.findById(chatId);

  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }

  if (!chat.groupChat) {
    throw new ApiError(400, "This is not a group chat");
  }

  if (chat.creator.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to rename this group");
  }

  chat.name = name;

  await chat.save();

  emitEvents(req, REFETCH_CHATS, chat.members);

  return res.status(200).json(new ApiResponse(200, name, "Group renamed successfully"));
});

const deleteChat = globalAsyncHandler(async (req, res) => {
  const chatId = req.params.id;

  const chat = await Chat.findById(chatId);

  if (!chat) {
    throw new ApiError(404, "Chat not found");
  }

  const members = chat.members;

  if (chat.groupChat && chat.creator.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not allowed to delete this group");
  }

  if (!chat.groupChat && !chat.members.includes(req.user._id.toString())) {
    throw new ApiError(403, "You are not allowed to delete this group");
  }

  const messagesWithAttachments = await Message.find({
    chat: chatId,
    attachments: { $exists: true, $ne: [] },
  });

  const public_ids = [];

  messagesWithAttachments.forEach(({ attachments }) => {
    attachments.forEach(({ public_id }) => {
      public_ids.push(public_id);
    });
  });

  await Promise.all([
    // Delete files from cloudinary
    deleteFileFromCloudinary(public_ids),
    chat.deleteOne(),
    Message.deleteMany({ chat: chatId }),
  ]);

  emitEvents(req, REFETCH_CHATS, members);

  return res.status(200).json(new ApiResponse(200, "Chat deleted successfully"));
});

const getMessages = globalAsyncHandler(async (req, res) => {
  const chatId = req.params.id;

  const { page = 1, limit = 20 } = req.query;

  const skip = (page - 1) * limit;

  const [messages, totalMessagesCount] = await Promise.all([
    Message.find({ chat: chatId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("sender", "name")
      .lean(),
    Message.countDocuments({ chat: chatId }),
  ]);

  const totalPages = Math.ceil(totalMessagesCount / limit);

  return res.status(200).json({
    messages: messages.reverse(),
    totalPages,
  });
});

export {
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
};
