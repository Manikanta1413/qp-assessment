import { AppDataSource } from "../src/config/database";
export default async () => {
  await AppDataSource.destroy();
};
