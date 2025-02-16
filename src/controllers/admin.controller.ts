import { Request, Response, NextFunction } from "express";
import AdminService from "../services/admin.service";

export class AdminController {
  private adminService = new AdminService();

  async addGrocery(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const grocery = await this.adminService.addGrocery(req.body);
       res
        .status(201)
        .json({ message: "Grocery added successfully", data: grocery });
    } catch (error) {
      next(error);
    }
  }

  async updateGrocery(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const grocery = await this.adminService.updateGrocery(
        Number(req.params.id),
        req.body
      );
       res
        .status(200)
        .json({ message: "Grocery updated successfully", data: grocery });
    } catch (error) {
      next(error);
    }
  }

  async deleteGrocery(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      await this.adminService.deleteGrocery(Number(req.params.id));
      res.status(200).json({ message: "Grocery deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  async getGroceries(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const { page = "1", limit = "10" } = req.query;
      const groceries = await this.adminService.getGroceries(
        Number(page),
        Number(limit)
      );
      res
        .status(200)
        .json({ message: "Groceries fetched successfully", data: groceries });
    } catch (error) {
      next(error);
    }
  }
}
