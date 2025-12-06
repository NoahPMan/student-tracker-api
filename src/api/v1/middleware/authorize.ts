import { Request, Response, NextFunction } from "express";

export const isAuthorized = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = res.locals.role;
    if (!roles.includes(userRole)) {
      return res.status(403).json({
        success: false,
        error: {
          message: "Forbidden: Insufficient role",
          code: "INSUFFICIENT_ROLE",
        },
      });
    }
    next();
  };
};