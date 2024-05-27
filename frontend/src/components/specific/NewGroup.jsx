import { Button, Dialog, DialogTitle, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { sampleUsers } from "../../constants/sampleData";
import UserItem from "../shared/UserItem";
import { useInputValidation } from "6pp";

const NewGroup = () => {
  const groupname = useInputValidation("");
  const [members, setMembers] = useState(sampleUsers);
  const [selectedMenber, setselectedMember] = useState([]);

  const selectMemberHandler = (id) => {
    setselectedMember((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
  };
  console.log(setselectedMember);

  const submitHandler = () => {};

  const closeHandler = () => {};
  return (
    <Dialog open onClose={closeHandler}>
      <Stack
        padding={{
          xs: "1rem",
          sm: "3rem",
        }}
        width={"25rem"}
        spacing={"2rem"}
      >
        <DialogTitle textAlign={"center"} variant="h4">
          New group
        </DialogTitle>

        <TextField label="Group Name" value={groupname.value} onChange={groupname.changeHandler} />
        <Typography variant="body1">Members</Typography>

        <Stack>
          {members.map((i) => (
            <UserItem user={i} key={i._id} handler={selectMemberHandler} isAdded={selectedMenber.includes(i._id)} />
          ))}
        </Stack>
        <Stack direction={"row"} justifyContent={"space-evenly"}>
          <Button variant="outlined" color="error" size="large">
            Cancal
          </Button>
          <Button variant="contained" size="large" onClick={submitHandler}>
            Create
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

export default NewGroup;
