import express from "express";
import adminRoutes from "./routes/admin.route";
import { errorHandler } from "./middleware/errorMiddleware";
import { initializeDatabase } from "./config/database";
import dotenv from "dotenv";
import userRouter from "./routes/user.route";

dotenv.config();

const app = express();
app.use(express.json());

// Initialize Database
initializeDatabase();

// Register Routes
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/user", userRouter);

// Global Error Handler
app.use(errorHandler);

export default app;
