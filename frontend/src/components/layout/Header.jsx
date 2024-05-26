import { useNavigate } from "react-router-dom";
import { AppBar, Backdrop, Box, IconButton, Toolbar, Tooltip, Typography } from "@mui/material";
import React, { lazy, useState } from "react";
import { orange } from "../../constants/color";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotifacionIcon,
} from "@mui/icons-material";
import { Suspense } from "react";

const SearchDialog = lazy(() => import("../specific/Search"));
const NewGroup = lazy(() => import("../specific/NewGroup"));
const Notifaction = lazy(() => import("../specific/Notification"));

const Header = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotifaction, setIsNotifaction] = useState(false);

  const handleMobile = () => {
    setIsMobile((prev) => !prev);
  };

  const openSearchDilog = () => {
    setIsSearch((prev) => !prev);
  };

  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev);
  };

  const navagateGroup = () => navigate("/group");

  const openNotifacion = () => {
    setIsNotifaction((prev) => !prev);
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
        }}
        height={"4rem"}
      >
        <AppBar
          position="static"
          sx={{
            bgcolor: orange,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: {
                  xs: "none",
                  sm: "block",
                },
              }}
            >
              WhatsApp
            </Typography>
            <Box
              sx={{
                display: {
                  xs: "block",
                  sm: "none",
                },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
              }}
            />
            <Box>
              <IconBtn title="Search" icon={<SearchIcon />} onClick={openSearchDilog} />
              <IconBtn title="New Group" icon={<AddIcon />} onClick={openNewGroup} />
              <IconBtn title="Manage Group" icon={<GroupIcon />} onClick={navagateGroup} />
              <IconBtn title="Notifaction" icon={<NotifacionIcon />} onClick={openNotifacion} />
              <IconBtn title="Logout" icon={<LogoutIcon />} onClick={logoutHandler} />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open={true} />}>
          <SearchDialog />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open={true} />}>
          <NewGroup />
        </Suspense>
      )}
      {isNotifaction && (
        <Suspense fallback={<Backdrop open={true} />}>
          <Notifaction />
        </Suspense>
      )}
    </>
  );
};

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
