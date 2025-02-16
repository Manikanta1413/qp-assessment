import { Router } from "express";
import { AdminRouter } from "./admin.route";
import { UserRouter } from "./user.route";

const router = Router();

router.use("/user", UserRouter);
router.use("/admin", AdminRouter);

export default router;
