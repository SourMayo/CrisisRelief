// Add to your auth routes (or create authRoutes.ts)
import { Router } from "express";

export const authRouter = Router();

authRouter.get("/check", (req, res) => {
  if (req.session.user) {
    return res.status(200).json({ authenticated: true });
  }
  res.status(401).json({ authenticated: false });
});
