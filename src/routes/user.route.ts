import { Router } from "express";
import { getGroceries, bookGroceries } from "../controllers/user.controller";
import { grocerySchema } from "../validations/grocery.validation";
import { validate } from "../middleware/validationMiddleware";

const UserRouter = Router();

UserRouter.route("/groceries").get((req, res) => getGroceries(req, res));

UserRouter.route("/order").post(validate(grocerySchema), (req, res) =>
  bookGroceries(req, res)
);

export { UserRouter };
