import express from "express";
import adminRoutes from "./routes/admin.route";
import { initializeDatabase } from "./config/database";
import dotenv from "dotenv";
import { errorHandler } from "./middleware/errorMiddleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Initialize Database
initializeDatabase();

app.use("/api/v1/admin", adminRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export { app };
