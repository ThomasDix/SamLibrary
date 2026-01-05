import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/tokens";
import { User } from "../models/User";

export interface AuthRequest extends Request {
  user?: any;
}

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith("Bearer ")) return res.status(401).json({ error: "Missing auth token" });
  const token = auth.slice(7);
  try {
    const payload: any = verifyAccessToken(token) as any;
    const user = await User.findById(payload.userId).select("-passwordHash").lean();
    if (!user) return res.status(401).json({ error: "User not found" });
    req.user = user;
    next();
  } catch (e) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}