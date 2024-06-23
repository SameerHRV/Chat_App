import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import mongoose, { Schema } from "mongoose";
import { config } from "../config/config.js";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  next();
});

userSchema.methods.comparePassword = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    config.jwt.accessTokenSecret,
    {
      expiresIn: config.jwt.accessTokenExpiresIn,
    },
  );
};

export const User = mongoose.models.User || mongoose.model("User", userSchema);
