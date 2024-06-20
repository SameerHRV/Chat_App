import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { IconButton, Stack } from "@mui/material";
import { grayColor, orange } from "../constants/colors";
import { AttachFile, Send } from "@mui/icons-material";
import { InputBox } from "../components/styles/StyleedComponents";
import FileMexu from "../components/dialogs/FileMexu";
import { sampleMessage } from "../constants/sampleData";
import MessageComponent from "../components/share/MessageComponent";

const user = {
  _id: "2",
  name: "Sameer",
};

const Chat = () => {
  const containerRef = React.useRef(null);

  return (
    <>
      <Stack
        ref={containerRef}
        boxSizing={"border-box"}
        padding={"2rem"}
        spacing={"2rem"}
        bgcolor={grayColor}
        height={"90%"}
        sx={{
          overflowX: "hidden",
          overflowY: "auto",
        }}
      >
        {sampleMessage.map((i) => (
          <MessageComponent message={i} user={user} key={i._id} />
        ))}
      </Stack>

      <form
        style={{
          height: "10%",
        }}
      >
        <Stack direction={"row"} height={"100%"} padding={"1rem"} alignItems={"center"} position={"relative"}>
          <IconButton
            sx={{
              position: "absolute",
              left: "1.5rem",
            }}
          >
            <AttachFile />
          </IconButton>

          <InputBox placeholder="Message here..." />

          <IconButton
            type="submit"
            sx={{
              backgroundColor: `${orange}`,
              color: "white",
              marginLeft: "1rem",
              padding: "0.5rem",
              ":hover": { backgroundColor: "error.dark", color: "white" },
            }}
          >
            <Send />
          </IconButton>
        </Stack>
      </form>

      <FileMexu />
    </>
  );
};

export default AppLayout(Chat);
