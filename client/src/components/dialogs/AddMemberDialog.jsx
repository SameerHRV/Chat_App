import { Button, Dialog, DialogTitle, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import UserItem from "../share/UserItem";
import { sampleUsers } from "../../constants/sampleData";

const AddMemberDialog = ({ addMember, isLodingAddMember, chatId }) => {
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMembers, setselectedMembers] = useState([]);

  const selectMemberHandler = (id) => {
    setMembers((prev) => prev.map((user) => (user._id === id ? { ...user, isAdded: !user.isAdded } : user)));

    setselectedMembers((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };

  const addMemberSubmitHandler = () => {
    closeHandler();
  };

  const closeHandler = () => {
    setselectedMembers([]);
    setMembers("");
  };

  return (
    <Dialog open onClick={closeHandler}>
      <Stack p={"2rem"} width={"20rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"}>Add Member</DialogTitle>
        <Stack spacing={"1rem"}>
          {members.length > 0 ? (
            members.map((i) => {
              return (
                <UserItem
                  key={i._id}
                  user={i}
                  handler={selectMemberHandler}
                  isAdded={selectedMembers.includes(i._id)}
                />
              );
            })
          ) : (
            <Typography textAlign={"center"}>NO FRIENDS</Typography>
          )}
        </Stack>
        <Stack direction={"row"} alignItems={"center"} justifyContent={"space-evenly"}>
          <Button onClick={addMemberSubmitHandler} variant="contained" disabled={isLodingAddMember}>
            Add Friend
          </Button>
          <Button onClick={closeHandler} color="error" variant="outlined">
            Cancel
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default AddMemberDialog;
