import { Avatar, Box, Stack } from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";
import RenderComponent from "../../components/share/RenderComponent";
import Table from "../../components/share/Table";
import { dashboardData } from "../../constants/sampleData";
import { fileFormat, transformImage } from "../../lib/features";

const columns = [
  {
    field: "id",
    headerName: "ID",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "attachments",
    headerName: "Attachments",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => {
      const { attachments } = params.row;

      return attachments?.length > 0
        ? attachments.map((i) => {
            const url = i.url;
            const file = fileFormat(url);
            return (
              <Box>
                <a
                  href={url}
                  style={{
                    color: "black",
                  }}
                  target="_blank"
                  download
                >
                  {RenderComponent(file, url)}
                </a>
              </Box>
            );
          })
        : "No Attachments";
    },
  },

  {
    field: "content",
    headerName: "Content",
    headerClassName: "table-header",
    width: 400,
  },

  {
    field: "sender",
    headerName: "Send by",
    headerClassName: "table-header",
    width: 150,
    renderCell: (params) => (
      <Stack direction={"row"} alignItems={"center"} spacing={"1rem"}>
        <Avatar alt={params.row.sender.name} src={params.row.sender.avatar} />
        <span>{params.row.sender.name}</span>
      </Stack>
    ),
  },

  {
    field: "chat",
    headerName: "Chat",
    headerClassName: "table-header",
    width: 200,
  },
  {
    field: "groupChat",
    headerName: "Group Chat",
    headerClassName: "table-header",
    width: 200,
  },

  {
    field: "creator",
    headerName: "Time",
    headerClassName: "table-header",
    width: 250,
  },
];

const MessageManagemant = () => {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    setRows(
      dashboardData.messages.map((i) => ({
        ...i,
        id: i._id,
        sender: {
          name: i.sender.name,
          avatar: transformImage(i.sender.avatar, 50),
        },
        createdAt: moment(i.createdAt).format("MMMM Do YYYY, h:mm:ss a"),
      }))
    );
  }, []);

  return (
    <AdminLayout>
      <Table headings={"All Messages"} rows={rows} columns={columns} rowHeight={200} />
    </AdminLayout>
  );
};

export default MessageManagemant;
