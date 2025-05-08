import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

type ThemeContextType = {
  isColorBlindMode: boolean;
  toggleColorBlindMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [isColorBlindMode, setIsColorBlindMode] = useState(
    () => localStorage.getItem("cb-mode") === "true"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (isColorBlindMode) {
      root.classList.add("cb-mode");
    } else {
      root.classList.remove("cb-mode");
    }
    localStorage.setItem("cb-mode", JSON.stringify(isColorBlindMode));
  }, [isColorBlindMode]);

  const toggleColorBlindMode = () => {
    setIsColorBlindMode((prev) => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isColorBlindMode, toggleColorBlindMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
