import { Request, Response, NextFunction } from "express";
import { UserRole } from "../entities/User";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../types/express";

declare global {
  namespace Express {
    interface Request {
      user?: { id: number; role: UserRole };
    }
  }
}

export const authenticateUser = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  let token = req.header("Authorization");

  if (!token) {
    res.status(401).json({ message: "Access Denied. No token provided." });
    return;
  }

  if (!token.startsWith("Bearer ")) {
    token = "Bearer " + token; 
  }

  const tokenValue = token.split(" ")[1]; 
  if (!tokenValue) {
    res.status(401).json({ message: "Access Denied. Invalid token format." });
    return;
  }

  try {
    const secretKey = process.env.JWT_SECRET || "default_secret";
    const decoded = jwt.verify(tokenValue, secretKey) as {
      id: number;
      role: UserRole;
    };

    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

export const authorizeAdmin = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  if (!req.user || req.user.role !== UserRole.ADMIN) {
    res.status(403).json({ message: "Access Denied. Admins only." });
    return;
  }
  next();
};
