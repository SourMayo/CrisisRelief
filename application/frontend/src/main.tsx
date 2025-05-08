import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ThemeProvider } from "./context/ThemeContext"; // ✅ Add this

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      {" "}
      {/* ✅ Wrap App */}
      <App />
    </ThemeProvider>
  </StrictMode>
);
