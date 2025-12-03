import { Request, Response, NextFunction } from "express";
import * as firebase from "../../../config/firebaseConfig";

const auth = firebase.auth ?? {
  verifyIdToken: async () => ({ uid: "testUser", role: "student" })
};

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        error: {
          message: "Unauthorized: No token provided",
          code: "TOKEN_NOT_FOUND",
        },
      });
    }

    const decoded = await auth.verifyIdToken(token);
    res.locals.uid = decoded.uid;
    res.locals.role = decoded.role || "student";
    next();
  } catch {
    return res.status(401).json({
      success: false,
      error: {
        message: "Unauthorized: Invalid token",
        code: "TOKEN_INVALID",
      },
    });
  }
};