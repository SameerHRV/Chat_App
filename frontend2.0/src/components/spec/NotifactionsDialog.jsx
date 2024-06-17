import { Avatar, Button, Dialog, DialogTitle, ListItem, Stack, TextField, Typography } from "@mui/material";
import React, { memo } from "react";
import { notifcationUsers } from "../../constants/sampleData";

const NotifactionsDialog = () => {
  const frendRequestHandler = ({ _id, accept }) => {
    // handle friend request
  };

  return (
    <Dialog open>
      <Stack padding={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Notification</DialogTitle>

        {notifcationUsers.length > 0 ? (
          notifcationUsers.map((i) => (
            <NotificationItem sender={i.sender} _id={i._id} handler={frendRequestHandler} key={i._id} />
          ))
        ) : (
          <TextField label="Notification" variant="outlined" size="small">
            No Notification
          </TextField>
        )}
      </Stack>
    </Dialog>
  );
};

const NotificationItem = memo(({ sender, _id, handler }) => {
  const { name, avatar } = sender;

  return (
    <ListItem>
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} width={"100%"}>
        <Avatar src={avatar} />
        <Typography
          variant="body1"
          sx={{
            flexGrow: 1,
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {`${name} sent you a friend request`}
        </Typography>
        <Stack
          direction={{
            xs: "column",
            sm: "row",
          }}
        >
          <Button onClick={() => handler({ _id, accept: true })}>Accept</Button>
          <Button onClick={() => handler({ _id, accept: false })} color="error">
            Reject
          </Button>
        </Stack>
      </Stack>
    </ListItem>
  );
});

export default NotifactionsDialog;
