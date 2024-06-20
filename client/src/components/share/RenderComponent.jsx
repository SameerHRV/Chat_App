import { FileOpen } from "@mui/icons-material";
import React from "react";
import { transformImage } from "../../lib/features";

const RenderComponent = (file, url) => {
  switch (file) {
    case "video":
      return <video src={url} controls preload="none" width={"200px"} />;

    case "audio":
      return <audio src={url} controls preload="auto" />;

    case "image":
      return (
        <img
          src={transformImage(url, 200)}
          alt={"Attachment"}
          width={"200px"}
          height={"200px"}
          style={{ objectFit: "contain" }}
        />
      );

    default:
      <FileOpen />;
  }
};

export default RenderComponent;
