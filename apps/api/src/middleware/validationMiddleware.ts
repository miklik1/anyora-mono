import { Request, Response, NextFunction } from "express";
import { z, ZodError } from "zod";

export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      schema.parse(req.body);
      next(); // Proceed to the next middleware/route handler
    } catch (error) {
      if (error instanceof ZodError) {
        // Send validation errors as response
        res.status(400).json({
          error: "Validation error",
          details: error.errors.map((err) => ({
            path: err.path,
            message: err.message,
          })),
        });
      } else {
        // Pass any unexpected errors to Express error handler
        next(error);
      }
    }
  };
};
