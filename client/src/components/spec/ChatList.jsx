import { Stack } from "@mui/material";
import React from "react";
import ChatItem from "../share/ChatItem";
import { bgGradient } from "../../constants/colors";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessagesAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <Stack
      width={w}
      height={"100%"}
      direction={"column"}
      overflow={"auto"}
      sx={{
        backgroundImage: bgGradient,
      }}
    >
      {chats?.map((data, index) => {
        const { avatar, name, _id, groupChat, members } = data;
        const newMessageAlert = newMessagesAlert.find(({ chatId }) => chatId === _id);

        const isOnline = members?.some((member) => onlineUsers.includes(member));

        return (
          <ChatItem
            key={_id}
            index={index}
            newMessageAlert={newMessageAlert}
            isOnline={isOnline}
            avatar={avatar}
            name={name}
            _id={_id}
            groupChat={groupChat}
            sameSender={chatId === _id}
            handleDeleteChat={handleDeleteChat}
          />
        );
      })}
    </Stack>
  );
};

export default ChatList;
