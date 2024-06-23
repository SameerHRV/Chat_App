import { Add, Group, Logout, Menu, NotificationAdd, Search } from "@mui/icons-material";
import { AppBar, Backdrop, Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import React, { lazy, Suspense } from "react";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import { orange } from "../../constants/color";

const SearchDialog = lazy(() => import("../dialogs/Search"));
const NewGroupDialog = lazy(() => import("../dialogs/NewGroup"));
const NotifactionDialog = lazy(() => import("../dialogs/Notifaction"));

const Header = () => {
  const navigate = useNavigate();
=======
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { orange } from "../../constants/colors";

const SearchDialog = lazy(() => import("../spec/SearchDialog"));
const NotifactionsDialog = lazy(() => import("../spec/NotifactionsDialog"));
const NewGroup = lazy(() => import("../spec/NewGroup"));

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
>>>>>>> 3dc77cd73031c1de4f5a3b1ee4fe48512744cd03

  const [isMobile, setIsMobile] = React.useState(false);
  const [isSearch, setIsSearch] = React.useState(false);
  const [isNewGroup, setIsNewGroup] = React.useState(false);
  const [isNotifaction, setIsNotifaction] = React.useState(false);

  const handleMobile = () => {
    console.log("handleMobile");
    setIsMobile((prev) => !prev);
  };

  const openSearchDialog = () => {
    console.log("openSearchDialog");
    setIsSearch((prev) => !prev);
  };

  const openNewGroup = () => {
    console.log("openNewGroup");
    setIsNewGroup((prev) => !prev);
  };

  const openNotifacion = () => {
    console.log("openNotifacion");
    setIsNotifaction((prev) => !prev);
  };

  const navigateGroup = () => {
    navigate("/groups");
  };

  const logoutHandler = async () => {};

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
        }}
        height={"4rem"}
      >
        <AppBar position="static" sx={{ bgcolor: orange }}>
          <Toolbar>
            <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
              WhatsApp
            </Typography>

            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <Menu />
              </IconButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <IconBtn title="Search" icon={<Search />} onClick={openSearchDialog} />
              <IconBtn title="New Group" icon={<Add />} onClick={openNewGroup} />
              <IconBtn title="Manage Group" icon={<Group />} onClick={navigateGroup} />
              <IconBtn title="Notifaction" icon={<NotificationAdd />} onClick={openNotifacion} />
              <IconBtn title="Logout" icon={<Logout />} onClick={logoutHandler} />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open={true} />}>
          <SearchDialog />
        </Suspense>
      )}
      {isNotifaction && (
        <Suspense fallback={<Backdrop open={true} />}>
<<<<<<< HEAD
          <NotifactionDialog />
=======
          <NotifactionsDialog />
>>>>>>> 3dc77cd73031c1de4f5a3b1ee4fe48512744cd03
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open={true} />}>
<<<<<<< HEAD
          <NewGroupDialog />
=======
          <NewGroup />
>>>>>>> 3dc77cd73031c1de4f5a3b1ee4fe48512744cd03
        </Suspense>
      )}
    </>
  );
};

// eslint-disable-next-line react/prop-types
const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
