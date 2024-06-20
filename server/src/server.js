import createHttpError from "http-errors";
import { server } from "./app.js";
import { connectDB } from "./database/connectDB.js";

const startServer = () => {
  try {
    const port = process.env.PORT || 3000;
    connectDB()
      .then(() => {
        server.listen(port, () => {
          console.log(` 🚩 Server running on port http://localhost:${port}`);
        });
      })
      .catch((error) => {
        const errMessage = createHttpError(500, "Internal Server Error", error.message);
        console.error(errMessage);
        process.exit(1);
      });
  } catch (error) {
    const errMessage = createHttpError(500, "Internal Server Error", error.message);
    console.error(errMessage);
    process.exit(1);
  }
};

startServer();
