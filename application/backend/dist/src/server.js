"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const port = 5001;
const ratingRoutes = require("./routes/rating.routes");
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api", ratingRoutes);
// Mount the register router at '/register'
app.use("/register", routes_1.registerRouter);
app.listen(port, "0.0.0.0", () => {
  console.log(`Server is listening on port ${port}`);
});
