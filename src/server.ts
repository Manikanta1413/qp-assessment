import express from "express";
import adminRoutes from "./routes/admin.route";
import { initializeDatabase } from "./config/database";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorMiddleware";
import userRouter from "./routes/user.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Database
initializeDatabase()
  .then((response: any) => {
    console.log("Database Connected Successfully!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: any) => {
    console.error(`Database Connection Failed : ${error}`);
  });

app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/user", userRouter);
app.use(errorHandler);

export { app };
