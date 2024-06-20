import mongoose, { Schema, Types } from "mongoose";

const requestSchema = new Schema(
  {
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "active", "inactive"],
    },
    sender: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Request = mongoose.models.Request || mongoose.model("Request", requestSchema);
