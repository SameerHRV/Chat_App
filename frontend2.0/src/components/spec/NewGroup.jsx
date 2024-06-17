import { useInputValidation } from "6pp";
import { Button, Dialog, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import React from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../share/UserItem";

const NewGroup = () => {
  const [members, setMembers] = React.useState(sampleUsers);
  const [selectedMembers, setselectedMembers] = React.useState([]);

  const groupName = useInputValidation("");

  const selectMemberHandler = (id) => {
    setMembers((prev) => prev.map((user) => (user._id === id ? { ...user, isAdded: !user.isAdded } : user)));

    setselectedMembers((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };
  // console.log(selectedMembers);

  const submitHandler = () => {};

  const closeHandler = () => {};

  return (
    <Dialog open onClose={closeHandler}>
      <Stack padding={"2rem"} direction={"column"} width={"25rem"} spacing={"2rem"}>
        <DialogTitle textAlign={"center"} variant="h4">
          New group
        </DialogTitle>
        <TextField value={groupName.value} onChange={groupName.changeHandler} label="Group Name" />
        <Typography variant="body1" sx={{ marginTop: "1rem", textAlign: "center" }}>
          Members
        </Typography>
        <Stack>
          {members.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={selectMemberHandler}
              isAdded={selectedMembers.includes(user._id)}
            />
          ))}
        </Stack>

        <Stack direction={"row"} justifyContent={"space-evenly"} marginTop="1rem">
          <Button variant="outlined" color="error" size="large">
            Cancal
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => {
              submitHandler();
            }}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
