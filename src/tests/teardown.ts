import { AppDataSource } from "../config/database";
export default async () => {
  await AppDataSource.destroy();
};
