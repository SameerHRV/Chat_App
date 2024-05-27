import { Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import React from "react";

const NewGroup = () => {
  return (
    <Dialog open>
      <Stack
        padding={{
          xs: "1rem",
          sm: "2rem",
        }}
        maxWidth={"25rem"}
      >
        <DialogTitle>Notification</DialogTitle>
        {sampleNotifications.length > 0 ? (
          sampleNotifications.map((i) => (
            <NotificationItem sender={i.sender} _id={i._id} handler={frendRequestHandler} key={i._id} />
          ))
        ) : (
          <Typography textAlign={"center"}>0 Notification</Typography>
        )}
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
