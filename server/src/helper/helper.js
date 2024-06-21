import { userIDs } from "../app.js";

export const getOtherMember = (members, userId) =>
  members.find((member) => member._id.toString() !== userId.toString());

export const getSockets = (members = []) => {
  const sockets = members.map((member) => userIDs.get(member._id).toString());

  return sockets;
};

export const base64ToFile = (filename) => {
  `data:${filename.mimetype};base64,${filename.buffer.toString("base64")}`;
};
