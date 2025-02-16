import dotenv from "dotenv";

dotenv.config();

export const config = {
  PORT: process.env.PORT || 3000,
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_PORT: Number(process.env.DB_PORT) || 3306,
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "qp_assessment",
  DB_NAME: process.env.DB_NAME || "grocery_db",
  JWT_SECRET: process.env.JWT_SECRET || "qp-assessment",
  NODE_ENV: process.env.NODE_ENV || "test",
  DB_NAME_TEST: process.env.DB_NAME_TEST || "grocery_db_test"
};
