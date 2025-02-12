import { UserRole } from "../entities/User";
import jwt from "jsonwebtoken";
export const authenticateUser = (req, res, next) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(" ")[1]; // Bearer Token
    if (!token) {
        res
            .status(401)
            .json({ message: "Access Denied. No token provided." });
        return;
    }
    try {
        const secretKey = process.env.JWT_SECRET || "default_secret";
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid or expired token" });
    }
};
export const authorizeAdmin = (req, res, next) => {
    if (!req.user || req.user.role !== UserRole.ADMIN) {
        res.status(403).json({ message: "Access Denied. Admins only." });
        return;
    }
    next();
};
