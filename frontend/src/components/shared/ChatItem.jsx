import React from "react";
import { Link } from "../style/styleComponents";

const ChatItem = ({
  avatar = [],
  name,
  _id,
  groupChat = false,
  samerSender = false,
  isOnline,
  newMessage,
  index = 0,
  handleDeleteChatOpen,
}) => {
  return (
    <Link to={`/chat/${_id}`}>
      <div
        style={{
          display: "flex",
          gap: "10px",
          // justifyContent: "space-between",
          alignItems: "center",
          padding: "10px",
          backgroundColor: samerSender ? "black" : "unset",
          color: samerSender ? "black" : "unset",
          cursor: "pointer",
          position: "relative",
        }}
      >
        {/* AVaTar Card */}
      </div>
    </Link>
  );
};

export default ChatItem;
