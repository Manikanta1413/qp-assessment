import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

const isTestEnv = process.env.NODE_ENV === "test";
const databaseName = isTestEnv ? process.env.DB_NAME_TEST : process.env.DB_NAME;

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "qp_assessment",
  database: databaseName || "grocery_db",
  entities: ["src/entities/**/*.ts"],
  synchronize: isTestEnv,
  logging: false,
  poolSize: 10,
});

export const initializeDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};
