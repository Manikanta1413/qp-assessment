import { Request, Response, NextFunction } from "express";
import { UserRole } from "../entities/User";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; role: UserRole };
    }
  }
}

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Bearer Token

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied. No token provided." });
  }

  try {
    const secretKey = process.env.JWT_SECRET || "default_secret";
    const decoded = jwt.verify(token, secretKey) as {
      id: number;
      role: UserRole;
    };

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const authorizeAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user || req.user.role !== UserRole.ADMIN) {
    return res.status(403).json({ message: "Access Denied. Admins only." });
  }
  next();
};
