import express from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  const { firstName, lastName, username, email, password, phoneNumber } =
    req.body;
  console.log("Received registration data:", req.body);

  // Here you would add validation, password hashing, database operations, etc.
  res.status(201).json({ message: "User registered successfully" });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
