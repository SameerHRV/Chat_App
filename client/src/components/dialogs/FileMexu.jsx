import { Menu } from "@mui/material";
import React from "react";

const FileMexu = ({ anchorE1 }) => {
  return (
    <Menu anchorEl={anchorE1} open={false}>
      <div style={{ width: "10rem" }}>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda possimus laudantium eius atque veniam ab ea
          eaque ullam itaque repellendus!
        </p>
      </div>
    </Menu>
  );
};

export default FileMexu;
