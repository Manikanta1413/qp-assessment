import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export const validate = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body);

    if (error) {
      const errorMessage = error.details.map((d: any) => d.message).join(", ");
      res.status(400).json({ success: false, message: errorMessage });
      return;
    }

    req.body = value;
    next();
  };
};
