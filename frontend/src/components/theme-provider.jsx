import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const initialState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext(initialState);

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "vite-ui-theme" }) {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem(storageKey);
    return storedTheme === "dark" || storedTheme === "light" || storedTheme === "system" ? storedTheme : defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    const applyTheme = theme === "system"
      ? window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
      : theme;

    root.classList.add(applyTheme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme) => {
      if (["light", "dark", "system"].includes(newTheme)) {
        localStorage.setItem(storageKey, newTheme);
        setTheme(newTheme);
      } else {
        console.warn(`Invalid theme value: ${newTheme}`);
      }
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
  defaultTheme: PropTypes.oneOf(["dark", "light", "system"]),
  storageKey: PropTypes.string,
};

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
