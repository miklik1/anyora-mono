import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authenticate(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized access" });
    return; // Stop further execution
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    (req as any).user = decoded; // Attach user info to the request object
    next(); // Call the next middleware
  } catch (error) {
    console.error("Token verification failed:", error);
    res.status(401).json({ error: "Invalid or expired token" });
  }
}
