import { Request, Response, NextFunction } from "express";
import { ApiError } from "../types/auth";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Error:", err);

  const errorResponse: ApiError = {
    success: false,
    message: "Internal server error",
  };

  // Handle specific error types
  if (err.name === "ValidationError") {
    errorResponse.message = "Validation failed";
    errorResponse.error = err.message;
    res.status(400).json(errorResponse);
    return;
  }

  if (err.name === "JsonWebTokenError") {
    errorResponse.message = "Invalid token";
    res.status(401).json(errorResponse);
    return;
  }

  if (err.name === "TokenExpiredError") {
    errorResponse.message = "Token expired";
    res.status(401).json(errorResponse);
    return;
  }

  // Default error response
  res.status(500).json(errorResponse);
};
