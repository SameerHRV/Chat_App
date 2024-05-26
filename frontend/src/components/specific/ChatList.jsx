import { Stack } from "@mui/material";
import React from "react";

const ChatList = ({
  w = "100%",
  chats = [],
  chatId,
  onlineUsers = [],
  newMessageAlert = [
    {
      chatId: "",
      count: 0,
    },
  ],
  handleDeleteChat,
}) => {
  return (
    <Stack width={w} direction={"column"}>
      {chats?.map((data, index) => {
        return (
          <div>
            <h1>{data}</h1>
          </div>
        );
      })}
    </Stack>
  );
};

export default ChatList;
