import { Box, Typography } from "@mui/material";
import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { grayColor } from "../constants/color";

const Home = () => {
  return (
    <Box height={"100%"} bgcolor={grayColor}>
      <Typography padding={"4rem"} variant="h2" textAlign={"center"}>
        welcome to WhatsApp
      </Typography>
    </Box>
  );
};

export default AppLayout(Home);
