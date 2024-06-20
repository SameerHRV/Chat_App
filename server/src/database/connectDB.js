import createHttpError from "http-errors";
import mongoose from "mongoose";
import { config } from "../config/config.js";

const connectDB = async () => {
  try {
    mongoose.connection.on("error", (error) => {
      const errMessage = createHttpError(500, "Internal Server Error", error.message);
      console.error(errMessage);
      process.exit(1);
    });

    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected established successfully");
    });

    const dbURLInstance = mongoose.connect(config.mongoDB.uri, {
      dbName: config.mongoDB.database,
    });

    console.log("Connected to MongoDB", (await dbURLInstance).connection.host);
  } catch (error) {
    const errMessage = createHttpError(500, "Internal Server Error", error.message);
    console.error(errMessage);
    process.exit(1);
  }
};

export { connectDB };
