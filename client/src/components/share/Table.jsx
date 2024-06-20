import { Container, Paper, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { matBlack } from "../../constants/colors";

const Table = ({ rows, columns, headings, rowHeight = 52 }) => {
  return (
    <Container
      sx={{
        height: "100vh",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "1rem 4rem",
          borderRadius: "1rem",
          margin: "auto",
          width: "100%",
          overflow: "auto",
          height: "100%",
          boxShadow: "0 0 0.5rem rgb(0,0,0,0.2)",
        }}
      >
        <Typography
          textAlign={"center"}
          variant="h4"
          sx={{
            margin: "2rem",
            textTransform: "capitalize",
          }}
        >
          {headings}
        </Typography>
        <DataGrid
          rows={rows}
          columns={columns}
          rowHeight={rowHeight}
          style={{
            height: "80%",
          }}
          sx={{
            border: "none",
            ".table-header": {
              backgroundColor: matBlack,
              color: "white",
            },
          }}
        />
      </Paper>
    </Container>
  );
};

export default Table;
