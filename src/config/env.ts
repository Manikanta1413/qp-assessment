import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: Number(process.env.DB_PORT) || 3306,
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "password",
  DB_NAME: process.env.DB_NAME || "grocery_db",
  JWT_SECRET: process.env.JWT_SECRET || "qp-assessment",
  REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
  REDIS_PORT: Number(process.env.REDIS_PORT) || 6379,
};
