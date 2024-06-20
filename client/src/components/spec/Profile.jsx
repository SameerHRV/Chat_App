import { Avatar, Stack, Typography } from "@mui/material";
import { Face as FaceIcon, AlternateEmail as EmailIcon, CalendarMonth as CalanderMonthIcon } from "@mui/icons-material";
import React from "react";
import moment from "moment";

const Profile = () => {
  return (
    <Stack spacing={"2rem"} direction={"column"} alignItems={"center"}>
      <Avatar sx={{ width: 200, height: 200, objectFit: "contain", marginBottom: "1rem", border: "1px solid white" }} />
      <ProfileCard text={"This is my bio"} heading={"Bio"} />
      <ProfileCard text={"Sameer"} heading={"Username"} Icon={<EmailIcon />} />
      <ProfileCard text={"Sameer Harapanahalli"} heading={"Name"} Icon={<FaceIcon />} />
      <ProfileCard
        text={moment("2024-06-16T18:30:00.000Z").fromNow()}
        heading={"Joined"}
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
