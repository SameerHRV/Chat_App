import { useInputValidation } from "6pp";
import { Dialog, DialogTitle, InputAdornment, List, ListItem, ListItemText, Stack, TextField } from "@mui/material";
import React, { useState } from "react";
import UserItem from "../share/UserItem";
import { sampleUsers } from "../../constants/sampleData";
import { Search } from "@mui/icons-material";

const SearchDialog = () => {
  const search = useInputValidation("");
  const [users, setuUsers] = useState(sampleUsers);

  const addFriendHandler = (id) => {
    console.log(id);
  };

  let isLoadingSendFriendRequest = false;

  return (
    <Dialog open>
      <Stack padding={"2rem"} direction={"column"} width={"25rem"}>
        <DialogTitle textAlign={"center"}>Find People</DialogTitle>
        <TextField
          label=""
          value={search.value}
          onChange={search.changeHandler}
          variant="outlined"
          size="small"
          inputProps={{
            startAdornment: (
              <InputAdornment position="start" sx={{ color: "white" }}>
                <Search />
              </InputAdornment>
            ),
          }}
        />

        <List>
          {users.map((user) => (
            <UserItem
              user={user}
              key={user._id}
              handler={addFriendHandler}
              handlerIsLoading={isLoadingSendFriendRequest}
            />
          ))}
        </List>
      </Stack>
    </Dialog>
  );
};

export default SearchDialog;
