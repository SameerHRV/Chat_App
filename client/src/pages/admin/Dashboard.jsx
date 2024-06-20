import { AdminPanelSettings, Group, Message, Notifications, Person } from "@mui/icons-material";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import moment from "moment";
import React from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import { DoughnutChart, LineChart } from "../../components/spec/Chart";
import { CurveButton, SearchField } from "../../components/styles/StyleedComponents";

const Dashboard = () => {
  const Appbar = (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        margin: "5rem auto",
        borderRadius: "1rem",
      }}
    >
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <AdminPanelSettings
          sx={{
            fontSize: "3rem",
          }}
        />
        <SearchField />
        <CurveButton>Search</CurveButton>
        <Box flexGrow={1} />
        <Typography
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
          }}
          color={"rgba(0,0,0,0.7)"}
          textAlign={"center"}
        >
          {moment().format("MMMM Do YYYY")}
        </Typography>
        <Notifications />
      </Stack>
    </Paper>
  );

  const Widgets = (
    <Stack
      direction={{
        xs: "column",
        sm: "row",
      }}
      spacing={"2rem"}
      justifyContent={"space-between"}
      alignItems={"center"}
      margin={"2rem 0"}
    >
      <Widget title={"Users"} value={34} Icon={<Person />} />
      <Widget title={"Chats"} value={45} Icon={<Group />} />
      <Widget title={"Messages"} value={3} Icon={<Message />} />
    </Stack>
  );
  return (
    <AdminLayout>
      <Container component="main">
        {Appbar}
        <Stack
          direction={{
            xs: "column",
            lg: "row",
          }}
          sx={{
            gap: "2rem",
          }}
          flexWrap={"wrap"}
          justifyContent={"center"}
          alignItems={{
            xs: "center",
            sm: "stretch",
          }}
        >
          <Paper
            elevation={3}
            sx={{
              padding: "2rem 3.5rem",
              borderRadius: "1rem",
              width: "100%",
              maxWidth: "45rem",
            }}
          >
            <Typography variant="h4" margin={"2rem 0"}>
              Last 7 Days Messages
            </Typography>
            <LineChart dataArray={[10, 50, 2, 74, 8, 30, 100, 85]} />
          </Paper>

          <Paper
            elevation={3}
            sx={{
              padding: "1rem",
              borderRadius: "1rem",
              display: "flex",
              // flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: {
                sx: "100%",
                sm: "50%",
              },
              position: "relative",
              width: "100%",
              maxWidth: "25rem",
            }}
          >
            <DoughnutChart labels={["Group Chats", "Single Chats"]} dataArray={[45, 5]} />
            <Stack
              position={"absolute"}
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
              spacing={"0.5rem"}
              width={"100%"}
              height={"100%"}
            >
              <Group /> <Typography>Vs</Typography>
              <Person />
            </Stack>
          </Paper>
        </Stack>

        {Widgets}
      </Container>
    </AdminLayout>
  );
};

const Widget = ({ title, value, Icon }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        padding: "2rem",
        margin: "2rem 0",
        borderRadius: "1.5rem",
        width: "20rem",
      }}
    >
      <Stack alignItems={"center"} spacing={"1rem"}>
        <Typography
          sx={{
            color: "rgba(0,0,0,0.7)",
            borderRadius: "50%",
            border: "5px solid rgba(0,0,0,0.9)",
            width: "5rem",
            height: "5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {value}
        </Typography>
        <Stack direction={"row"} spacing={"1rem"} alignItems={"center"}>
          {Icon}
          <Typography>{title}</Typography>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default Dashboard;
