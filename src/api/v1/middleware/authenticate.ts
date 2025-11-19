import { Request, Response, NextFunction } from "express";
import { auth } from "../../../config/firebaseConfig";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = await auth.verifyIdToken(token);
    res.locals.uid = decoded.uid;
    res.locals.role = decoded.role || "student";
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};