import { Link } from "react-router-dom";

const baseStyles =
  "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/60";

const variants = {
  primary:
    "bg-cyan-400 text-slate-950 shadow-glow hover:-translate-y-0.5 hover:bg-cyan-300",
  secondary:
    "border border-white/15 bg-white/5 text-white hover:border-cyan-300/40 hover:bg-white/10",
  ghost: "text-white/80 hover:bg-white/10 hover:text-white",
  dark: "bg-slate-950 text-white hover:bg-slate-800",
};

export default function Button({
  children,
  variant = "primary",
  to,
  type = "button",
  className = "",
  onClick,
  disabled = false,
}) {
  const classes = `${baseStyles} ${variants[variant] || variants.primary} ${className} ${disabled ? "cursor-not-allowed opacity-60" : ""}`;

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
