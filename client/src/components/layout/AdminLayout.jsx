import { Close, Dashboard, ExitToApp, Group, ManageAccounts, Menu, Message } from "@mui/icons-material";
import { Box, Drawer, Grid, IconButton, Stack, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLocation, Link as LinkComponent, Navigate } from "react-router-dom";
import { grayColor, matBlack } from "../../constants/colors";

const Link = styled(LinkComponent)`
  text-decoration: none;
  color: black;
  border-radius: 2rem;
  padding: 3rem 2rem;
  padding: 1rem;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const adminTabs = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <Dashboard />,
  },
  {
    name: "User",
    path: "/admin/user",
    icon: <ManageAccounts />,
  },
  {
    name: "Chats",
    path: "/admin/chat",
    icon: <Group />,
  },
  {
    name: "Messages",
    path: "/admin/message",
    icon: <Message />,
  },
];

const Sidebar = ({ w = "100%" }) => {
  const location = useLocation();

  const logoutHandler = () => {
    console.log("logoutHandler");
  };

  return (
    <Stack width={w} direction={"column"} p={"3rem"} spacing={"3rem"}>
      <Typography variant="h4" textTransform={"uppercase"}>
        WhatsApp
      </Typography>

      <Stack spacing={"1rem"}>
        {adminTabs.map((tab) => (
          <Link
            key={tab.path}
            to={tab.path}
            sx={
              location.pathname === tab.path && {
                color: "white",
                bgcolor: matBlack,
                ":hover": {
                  bgcolor: matBlack,
                  color: "white",
                },
              }
            }
          >
            <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
              {tab.icon}
              <Typography fontSize={"1.2rem"}>{tab.name}</Typography>
            </Stack>
          </Link>
        ))}

        {/* Logout */}
        <Link onClick={logoutHandler}>
          <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
            <ExitToApp />
            <Typography fontSize={"1.2rem"}>Logout</Typography>
          </Stack>
        </Link>
      </Stack>
    </Stack>
  );
};

const isAdmin = true;

const AdminLayout = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  const handleMobile = () => {
    setIsMobile((prev) => !prev);
  };

  const handleClose = () => {
    setIsMobile(false);
  };

  if (!isAdmin) return <Navigate to="/admin" />;

  return (
    <Grid container minHeight={"100vh"}>
      <Box
        sx={{
          display: {
            xs: "block",
            md: "none",
          },
          position: "fixed",
          right: "1rem",
          top: "1rem",
        }}
      >
        <IconButton onClick={handleMobile}>{isMobile ? <Close /> : <Menu />}</IconButton>
      </Box>

      <Grid
        item
        md={4}
        lg={3}
        sx={{
          display: {
            xs: "none",
            md: "block",
          },
        }}
      >
        <Sidebar />
      </Grid>
      <Grid
        item
        xs={12}
        md={8}
        lg={9}
        sx={{
          bgcolor: grayColor,
        }}
      >
        {children}
      </Grid>

      <Drawer open={isMobile} onClose={handleClose}>
        <Sidebar w="50vw" />
      </Drawer>
    </Grid>
  );
};

export default AdminLayout;
