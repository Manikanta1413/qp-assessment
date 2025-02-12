import express from "express";
import adminRoutes from "./routes/admin.route";
import { errorHandler } from "./middleware/errorMiddleware";
import { initializeDatabase } from "./config/database";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

// Initialize Database
initializeDatabase();

// Register Routes
app.use("/admin", adminRoutes);

// Global Error Handler
app.use(errorHandler);

export { app };
