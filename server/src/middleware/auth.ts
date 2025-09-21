import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";

export interface AuthRequest extends Request {
  user?: { id: number; role: string };
}

export function requireAuth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "missing or invalid authorization header" });
  }
  const token = header.substring(7);
  try {
    const payload = jwt.verify(token, env.jwtSecret) as unknown as {
      sub: number;
      role: string;
      iat: number;
      exp: number;
    };
    req.user = { id: payload.sub, role: payload.role };
    next();
  } catch {
    return res.status(401).json({ message: "invalid or expired token" });
  }
}

export function requireRole(...roles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) return res.status(401).json({ message: "unauthorized" });
    if (!roles.includes(req.user.role))
      return res.status(403).json({ message: "forbidden" });
    next();
  };
}
