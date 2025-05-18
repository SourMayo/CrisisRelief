import { Router } from "express";
import { db } from "../db";
import bcrypt from "bcryptjs";

export const registerRouter = Router();

// POST /register
registerRouter.post("/", async (req, res) => {
  const {
    firstName,
    middleName,
    lastName,
    username,
    email,
    password,
    phoneNumber,
  } = req.body;

  // Example validation (in real apps, perform more robust checks)
  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into "users" table using column names that match your migration
    await db("users").insert({
      first_name: firstName,
      middle_name: middleName || "", // default to empty string if middleName not provided
      last_name: lastName,
      username: username,
      email: email,
      hashed_password: hashedPassword,
      phone_number: phoneNumber,
    });

    res.status(201).json({ message: "User registered successfully" });
    console.log("User registered successfully");
  } catch (error) {
    console.error("Error inserting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});
