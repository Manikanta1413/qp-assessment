var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AdminService } from "../services/admin.service";
export class AdminController {
    constructor() {
        this.adminService = new AdminService();
    }
    addGrocery(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const grocery = yield this.adminService.addGrocery(req.body);
                res
                    .status(201)
                    .json({ message: "Grocery added successfully", data: grocery });
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateGrocery(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const grocery = yield this.adminService.updateGrocery(Number(req.params.id), req.body);
                res
                    .status(200)
                    .json({ message: "Grocery updated successfully", data: grocery });
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteGrocery(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.adminService.deleteGrocery(Number(req.params.id));
                res.status(200).json({ message: "Grocery deleted successfully" });
            }
            catch (error) {
                next(error);
            }
        });
    }
    getGroceries(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page = "1", limit = "10" } = req.query;
                const groceries = yield this.adminService.getGroceries(Number(page), Number(limit));
                res
                    .status(200)
                    .json({ message: "Groceries fetched successfully", data: groceries });
            }
            catch (error) {
                next(error);
            }
        });
    }
}
