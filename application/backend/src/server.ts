import express from "express";
import cors from "cors";
import { registerRouter, loginRouter } from "./routes";
import { searchController } from "./controllers/searchController";

const app = express();
const port = 5001;

// Update CORS config to allow credentials
app.use(
  cors({
    origin: "http://localhost:3000", // Your frontend URL
    credentials: true,
  })
);
app.use(express.json());

// Mount the register router at '/register'
app.use("/register", registerRouter);
app.use("/search", searchController);
app.use("/login", loginRouter);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is listening on port ${port}`);
});
