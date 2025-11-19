import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error(`Error: ${err.message}`);
  if (process.env.NODE_ENV !== "production") {
    console.error(`Stack: ${err.stack}`);
  }

  res.status(500).json({
    success: false,
    error: {
      message: err.message || "Internal server error",
      code: "INTERNAL_SERVER_ERROR",
    },
    timestamp: new Date().toISOString(),
  });
};