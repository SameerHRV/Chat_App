import { Box, Typography } from "@mui/material";
import moment from "moment";
import React, { memo } from "react";
import { lightBlue } from "../../constants/colors";
import { fileFormat } from "../../lib/features";
import RenderComponent from "./RenderComponent";

const MessageComponent = ({ message, user }) => {
  const { sender, content, _id, attachments = [] } = message;

  const sameSender = sender?._id === user?._id;

  const Date = moment(message.createdAt).format("MMMM Do, h:ss a");

  return (
    <div
      style={{
        alignSelf: sameSender ? "flex-end" : "flex-start",
        padding: "1rem",
        backgroundColor: "white",
        color: "black",
        borderRadius: "0.5rem",
        padding: "0.5rem",
        width: "fit-content",
      }}
    >
      {!sameSender && (
        <Typography color={lightBlue} fontWeight={"600"} variant="caption">{`${sender?.name}`}</Typography>
      )}
      {content && <Typography>{content}</Typography>}

      {/* Attachment */}
      {attachments.length > 0 &&
        attachments.map((attachment, index) => {
          const url = attachment?.url;
          const file = fileFormat(url);

          return (
            <Box key={index}>
              <a
                href={url}
                target="_blank"
                download
                style={{
                  color: "black",
                }}
              >
                {RenderComponent(file, url)}
              </a>
            </Box>
          );
        })}

      <Typography variant="caption" color={"text.secondary"}>
        {Date}
      </Typography>
    </div>
  );
};

export default memo(MessageComponent);
