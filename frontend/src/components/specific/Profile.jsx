import { Avatar, Stack, Typography } from "@mui/material";
import { Face as FaceIcon, AlternateEmail as EmailIcon, CalendarMonth as CalanderMonthIcon } from "@mui/icons-material";
import moment from "moment";
import React from "react";

const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar
        sx={{
          width: 200,
          height: 200,
          objectFit: "contain",
          marginBottom: "1rem",
          border: "1px solid white",
        }}
      />
      <ProfileCard heading={"Bio"} text={"This is my bio"} />
      <ProfileCard heading={"Username"} text={"Sameer"} Icon={<EmailIcon />} />
      <ProfileCard heading={"name"} text={"Sameer Harapanahalli"} Icon={<FaceIcon />} />
      <ProfileCard
        heading={"Joined"}
        text={moment("2024-04-01T18:30:00.000Z").fromNow()}
        Icon={<CalanderMonthIcon />}
      />
    </Stack>
  );
};

const ProfileCard = ({ text, Icon, heading }) => {
  return (
    <Stack direction={"row"} alignItems={"center"} spacing={"1rem"} color={"white"} textAlign={"center"}>
      {Icon && Icon}

      <Stack>
        <Typography variant="body1">{text}</Typography>
        <Typography color={"gray"} variant="caption">
          {heading}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Profile;
