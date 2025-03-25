"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = process.env.PORT || 5001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.post("/register", (req, res) => {
    const { firstName, lastName, username, email, password, phoneNumber } = req.body;
    console.log("Received registration data:", req.body);
    // Here you would add validation, password hashing, database operations, etc.
    res.status(201).json({ message: "User registered successfully" });
});
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
