import { Box, Typography } from "@mui/material";
import React from "react";
import AppLayout from "../components/layout/AppLayout";
import { grayColor } from "../constants/colors";

const Home = () => {
  return (
    <Box height={"100%"} bgcolor={grayColor}>
      <Typography padding={"2rem"} variant="h5" textAlign={"center"}>
        <h1 className="text-5xl text-white font-extrabold bg-gradient-to-r from-cyan-500 to-blue-500 p-10 rounded-xl">
          Welcome to WhatsApp
        </h1>
      </Typography>
    </Box>
  );
};

export default AppLayout(Home);
