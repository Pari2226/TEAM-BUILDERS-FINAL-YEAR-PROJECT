import { NavLink, Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignOutButton,
  UserButton,
  useAuth,
  useUser,
} from "@clerk/clerk-react";
import Button from "../ui/Button";
import ThemeToggle from "./ThemeToggle";

const publicNavItems = [
  { to: "/", label: "Home" },
  { to: "/teams", label: "Teams" },
];

const signedInNavItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/teams", label: "Teams" },
  { to: "/profile", label: "Profile" },
  { to: "/create-team", label: "Create Team" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const items = isSignedIn ? signedInNavItems : publicNavItems;

  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm transition ${isActive ? "bg-[var(--surface-soft)] text-[var(--app-text)]" : "text-[var(--text-muted)] hover:bg-[var(--surface-soft)] hover:text-[var(--app-text)]"}`;

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--nav-bg)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-3 text-lg font-bold tracking-tight text-[var(--app-text)]"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950 shadow-glow">
            TB
          </span>
          Team Builders
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {items.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          <SignedOut>
            <Button variant="ghost" to="/login">
              Login
            </Button>
            <Button to="/signup">Get Started</Button>
          </SignedOut>
          <SignedIn>
            <span className="text-sm text-[var(--text-muted)]">
              Hi, {user?.firstName || user?.fullName || "Builder"}
            </span>
            <UserButton afterSignOutUrl="/" />
            <SignOutButton>
              <Button variant="ghost">Logout</Button>
            </SignOutButton>
          </SignedIn>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface-soft)] text-[var(--app-text)] lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Open navigation"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-[var(--border)] bg-[var(--nav-bg-solid)] px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-2">
            {items.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="mt-2 flex items-center gap-3">
              <ThemeToggle />
              <SignedOut>
                <Button variant="ghost" to="/login">
                  Login
                </Button>
                <Button to="/signup">Signup</Button>
              </SignedOut>
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
                <SignOutButton>
                  <Button variant="ghost">Logout</Button>
                </SignOutButton>
              </SignedIn>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
