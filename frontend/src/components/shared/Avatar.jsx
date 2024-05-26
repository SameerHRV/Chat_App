import { AvatarGroup, Avatar as AvatarImg, Box, Stack } from "@mui/material";
import React from "react";

const Avatar = ({ avatar = [], max = 4 }) => {
  return (
    <Stack direction={"row"} spacing={0.5}>
      <AvatarGroup max={max}>
        <Box width={"5rem"} height={"3rem"}>
          {avatar.map((src, index) => {
            <AvatarImg
              key={Math.random() * 100}
              src={src}
              alt={`Avatar ${index}`}
              sx={{
                width: "3rem",
                height: "3rem",
                position: "absolute",
                left: {
                  xs: `${0.5 + index}rem`,
                  sm: `${index}rem`,
                },
              }}
            />;
          })}
        </Box>
      </AvatarGroup>
    </Stack>
  );
};

export default Avatar;
