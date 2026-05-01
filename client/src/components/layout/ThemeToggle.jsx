import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white/80 transition hover:border-cyan-300/40 hover:bg-white/10"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <FiSun /> : <FiMoon />}
    </button>
  );
}
