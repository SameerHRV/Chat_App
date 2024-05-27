import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { Typography } from "@mui/material";

const Home = () => {
  return (
    <Typography padding={"2rem"} variant="h5" textAlign={"center"}>
      Select a Friend to start chat
    </Typography>
  );
};

export default AppLayout()(Home);
