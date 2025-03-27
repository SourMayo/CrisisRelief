import { Router } from "express";
import { db } from "../db";
import bcrypt from "bcrypt";

export const registerRouter = Router();

// POST /register
registerRouter.post("/", async (req, res) => {
  const { firstName, lastName, username, email, password, phoneNumber } =
    req.body;

  // Example validation (in real apps, do more robust checks!)
  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" });
  }

  try {
    // Insert into the "users" table (assuming you have a migration for that)
    const hashedPassword = await bcrypt.hash(password, 10);
    await db("users").insert({
      first_name: firstName,
      last_name: lastName,
      username: username,
      email: email,
      password: hashedPassword,
      phone_number: phoneNumber,
    });

    res.status(201).json({ message: "User registered successfully" });
    console.log("User registered successfully");
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
