import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Grocery } from "../entities/Grocery";
import dotenv from "dotenv";

dotenv.config();

const isTestEnv = process.env.NODE_ENV === "test";
const databaseName = isTestEnv ? process.env.DB_NAME_TEST : process.env.DB_NAME;

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: databaseName,
  entities: [User, Grocery],
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
