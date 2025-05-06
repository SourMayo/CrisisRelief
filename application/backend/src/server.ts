import express from "express";
import cors from "cors";
import {
  registerRouter,
  loginRouter,
  authRouter,
  weatherRouter,
  googleRouter,
  reviewsRouter,
} from "./routes";
import { searchController } from "./controllers/searchController";
import { sessionMiddleware } from "./middlewares/sessions";

const app = express();
const port = 5001;

// Update CORS config to allow credentials
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

//cors({
// origin: "http://crisisrelief.duckdns.org:3000",
//credentials: true,

app.use(sessionMiddleware);
app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

// Mount the register router at '/register'
app.use("/register", registerRouter);
app.use("/search", searchController);
app.use("/login", loginRouter);
app.use("/auth", authRouter);
app.use("/weather", weatherRouter);
app.use("/google", googleRouter);
app.use("/reviews", reviewsRouter);

app.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  res.json({
    message: `Welcome, ${req.session.user.firstName}!`,
    user: req.session.user,
  });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Server is listening on port ${port}`);
});
