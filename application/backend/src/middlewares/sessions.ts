// middleware/sessions.ts
import session from "express-session";
import { RequestHandler } from "express";

// Extend session types directly in the middleware file
declare module "express-session" {
  interface SessionData {
    user?: {
      id: number;
      username: string;
      firstName: string;
    };
  }
}

export const sessionMiddleware: RequestHandler = session({
  secret: process.env.SESSION_SECRET || "dev-secret-key",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 2, // 2 hours
    secure: false,
    httpOnly: true,
    sameSite: "lax",
  },
});
