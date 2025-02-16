import { Request } from "express";
import { UserRole } from "../entities/User"; 

export interface AuthenticatedRequest extends Request {
  user?: {
    id?: number;
    role?: UserRole;
  };
}
