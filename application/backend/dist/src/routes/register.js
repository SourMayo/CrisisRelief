"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRouter = void 0;
const express_1 = require("express");
const db_1 = require("../db");
const bcrypt_1 = __importDefault(require("bcrypt"));
exports.registerRouter = (0, express_1.Router)();

exports.registerRouter.post("/", async (req, res) => {
  const { firstName, lastName, username, email, password, phoneNumber } =
    req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Missing email or password" });
  }
  try {
    const hashedPassword = await bcrypt_1.default.hash(password, 10);
    await (0, db_1.db)("users").insert({
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
