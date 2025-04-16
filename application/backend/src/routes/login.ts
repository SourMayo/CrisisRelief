import { Router } from "express";
import { db } from "../db";
import bcrypt from "bcrypt";

export const loginRouter = Router();

loginRouter.post("/", async (req, res) => {
  const { username, password } = req.body;

  try {
    // 1. Find user by username
    const user = await db("users").where({ username }).first();

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // 2. Verify password
    const isValid = await bcrypt.compare(password, user.hashed_password);

    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // 3. Create session
    req.session.user = {
      id: user.user_id,
      username: user.username,
      firstName: user.first_name,
    };

    // 4. Respond with user data (excluding sensitive info)
    res.json({
      id: user.user_id,
      username: user.username,
      firstName: user.first_name,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Add logout route
loginRouter.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Logged out successfully" });
  });
});
