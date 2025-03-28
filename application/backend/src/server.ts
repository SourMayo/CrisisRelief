import express from "express";
import cors from "cors";
import { registerRouter, search } from "./routes";

const app = express();
const port = 5001;

app.use(cors());
app.use(express.json());

// Mount the register router at '/register'
app.use("/register", registerRouter);
app.use("/search". search);

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is listening on port ${port}`);
});
