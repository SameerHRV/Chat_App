import { Add, Delete, DoneAll, Edit, KeyboardBackspace, Menu } from "@mui/icons-material";
import { Backdrop, Box, Button, Drawer, Grid, IconButton, Stack, TextField, Tooltip, Typography } from "@mui/material";
import React, { lazy, memo, Suspense, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import AvatarCard from "../components/share/AvatarCard";
import { Link } from "../components/styles/StyleedComponents";
import { samepleChats, sampleUsers } from "../constants/sampleData";
import UserItem from "../components/share/UserItem";
import { bgGradient } from "../constants/colors";

const ConformDeleteDialog = lazy(() => import("../components/dialogs/ConformDeleteDialog"));
const AddMemberDialog = lazy(() => import("../components/dialogs/AddMemberDialog"));

const isAddMember = false;

const Groups = () => {
  const chatId = useSearchParams()[0].get("group");
  const navigate = useNavigate();
  // console.log(chatId);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [conformDeleteDialog, setConformDeleteDialog] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupNameUpdatedValue, setGroupNameUpdatedValue] = useState("");

  const navigateBack = () => {
    navigate("/");
  };

  const handleMobile = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleMobileClose = () => {
    setIsMobileMenuOpen(false);
  };

  const updateGroupNameHandler = () => {
    setIsEdit(false);
    console.log(groupNameUpdatedValue);
  };

  const openConformDeleteHandler = () => {
    setConformDeleteDialog(true);
    console.log("Delete Conform");
  };

  const closeConformDeleteHandler = () => {
    setConformDeleteDialog(false);
  };

  const openAddMemberHandler = () => {
    console.log("Add Member ");
  };

  const deleteHandler = () => {
    console.log("Delete");
    closeConformDeleteHandler();
  };

  const removeMemberHandler = (id) => {
    console.log("Remover Member", id);
  };

  useEffect(() => {
    if (chatId) {
      setGroupName(`Group Name ${chatId}`);
      setGroupNameUpdatedValue(`Group Name ${chatId}`);
    }

    return () => {
      setGroupName("");
      setGroupNameUpdatedValue("");
      setIsEdit(false);
    };
  }, [chatId]);

  const IconsBtns = (
    <>
      <Box
        sx={{
          display: {
            xs: "block",
            sm: "none",
            position: "fixed",
            right: "1rem",
            top: "1.5rem",
          },
        }}
      >
        <Tooltip title="Menu">
          <IconButton onClick={handleMobile}>
            <Menu />
          </IconButton>
        </Tooltip>
      </Box>

      <Tooltip title="Back">
        <IconButton
          sx={{
            position: "absolute",
            left: "2rem",
            top: "2rem",
            bgcolor: "rgba(0,0,0,0.7)",
            color: "white",
            ":hover": {
              bgcolor: "rgba(0,0,0,0.8)",
            },
          }}
          onClick={() => {
            navigateBack();
          }}
        >
          <KeyboardBackspace />
        </IconButton>
      </Tooltip>
    </>
  );

  const GroupName = (
    <>
      <Stack direction={"row"} alignItems={"center"} justifyContent={"center"} spacing={"1rem"} padding={"3rem"}>
        {isEdit ? (
          <>
            <TextField value={groupNameUpdatedValue} onChange={(e) => setGroupNameUpdatedValue(e.target.value)} />
            <IconButton onClick={updateGroupNameHandler}>
              <DoneAll />
            </IconButton>
          </>
        ) : (
          <>
            <Typography variant="h4">{groupName}</Typography>
            <IconButton onClick={() => setIsEdit(true)}>
              <Edit />
            </IconButton>
          </>
        )}
      </Stack>
    </>
  );

  const ButtonGroup = (
    <>
      <Stack
        direction={{
          sm: "row",
          xs: "column-reverse",
        }}
        spacing={"1rem"}
        p={{
          sm: "1rem",
          xs: "0",
          md: "1rem 4rem",
        }}
      >
        <Button size="large" variant="outlined" color="error" startIcon={<Delete />} onClick={openConformDeleteHandler}>
          Delete Group
        </Button>
        <Button size="large" variant="contained" startIcon={<Add />} onClick={openAddMemberHandler}>
          Add Member
        </Button>
      </Stack>
    </>
  );

  return (
    <Grid container height={"100vh"}>
      <Grid
        item
        sx={{
          display: {
            xs: "none",
            sm: "block",
          },
        }}
        sm={4}
      >
        <GroupsList myGroups={samepleChats} chatId={chatId} />
      </Grid>

      <Grid
        item
        xs={12}
        sm={8}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
          padding: "1rem 3rem",
        }}
      >
        {IconsBtns}

        {groupName && (
          <>
            {GroupName}
            <Typography margin={"2rem"} alignSelf={"flex-start"} variant="body1">
              Members
            </Typography>
            <Stack
              maxWidth={"45rem"}
              width={"100%"}
              boxSizing={"border-box"}
              padding={{
                sm: "1rem",
                xs: "0",
                md: "1rem 4rem",
              }}
              spacing={"2rem"}
              height={"50vh"}
              overflow={"auto"}
            >
              {/* Members */}

              {sampleUsers.map((i) => (
                <UserItem
                  key={i._id}
                  user={i}
                  isAdded
                  styling={{
                    boxShadow: "0 0 0.5rem rgb(0,0,0,0.2)",
                    padding: "1rem 2rem",
                    borderRedius: "1rem",
                  }}
                  handler={removeMemberHandler}
                />
              ))}
            </Stack>

            {ButtonGroup}
          </>
        )}
      </Grid>

      {isAddMember && (
        <Suspense fallback={<Backdrop />}>
          <AddMemberDialog />
        </Suspense>
      )}

      {conformDeleteDialog && (
        <Suspense fallback={<Backdrop open />}>
          <ConformDeleteDialog
            open={conformDeleteDialog}
            handleClose={closeConformDeleteHandler}
            deleteHandler={deleteHandler}
            customMessage={"Are you sure you want to delete this group?"}
          />
        </Suspense>
      )}

      <Drawer
        sx={{
          display: {
            xs: "block",
            sm: "none",
          },
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileClose}
      >
        <GroupsList w={"50vw"} myGroups={samepleChats} chatId={chatId} />
      </Drawer>
    </Grid>
  );
};

const GroupsList = ({ w = "100%", myGroups = [], chatId }) => (
  <Stack
    sx={{
      backgroundImage: bgGradient,
      height: "100vh",
    }}
  >
    {myGroups.length > 0 ? (
      myGroups.map((group) => <GroupListItem group={group} chatId={chatId} key={group._id} />)
    ) : (
      <Typography>No Groups</Typography>
    )}
  </Stack>
);

const GroupListItem = memo(({ group, chatId }) => {
  const { name, avatar, _id } = group;

  return (
    <Link
      to={`?group=${_id}`}
      onClick={(e) => {
        if (chatId === _id) {
          e.preventDefault();
        }
      }}
    >
      <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
        <AvatarCard avatar={avatar} />
        <Typography>{name}</Typography>
      </Stack>
    </Link>
  );
});

export default Groups;
