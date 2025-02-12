import { Router } from "express";
import { AdminController } from "../controllers/admin.controller";
import { authenticateUser, authorizeAdmin } from "../middleware/authMiddleware";

const router = Router();
const adminController = new AdminController();

router.post(
  "/groceries",
  authenticateUser,
  authorizeAdmin,
  adminController.addGrocery
);
router.put(
  "/groceries/:id",
  authenticateUser,
  authorizeAdmin,
  adminController.updateGrocery
);
router.delete(
  "/groceries/:id",
  authenticateUser,
  authorizeAdmin,
  adminController.deleteGrocery
);
router.get(
  "/groceries",
  authenticateUser,
  authorizeAdmin,
  adminController.getGroceries
);

export default router;
