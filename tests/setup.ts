import dotenv from "dotenv";
import { initializeDatabase } from "../src/config/database";

// Load .env test file
dotenv.config({ path: ".env.test" });

// Initialize the test database
beforeAll(() => {
  initializeDatabase();
});

// // Clean up after all tests
// afterAll(async () => {
//   await global.__DB_CONNECTION__.close();
// });
