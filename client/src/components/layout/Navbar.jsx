import { NavLink, Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignOutButton,
  UserButton,
  useUser,
} from "@clerk/clerk-react";
import Button from "../ui/Button";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/teams", label: "Teams" },
  { to: "/find-teammates", label: "Find Teammates" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm transition ${isActive ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"}`;

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#081120]/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 lg:px-8">
        <Link
          to="/"
          className="flex items-center gap-3 text-lg font-bold tracking-tight text-white"
        >
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-400 text-slate-950 shadow-glow">
            TB
          </span>
          Team Builders
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
          <SignedIn>
            <NavLink to="/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/profile" className={linkClass}>
              Profile
            </NavLink>
            <NavLink to="/create-team" className={linkClass}>
              Create Team
            </NavLink>
          </SignedIn>
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
            <span className="text-sm text-white/60">
              Hi, {user?.firstName || user?.fullName || "Builder"}
            </span>
            <Button variant="secondary" to="/dashboard">
              Dashboard
            </Button>
            <Button variant="secondary" to="/profile">
              Profile
            </Button>
            <UserButton afterSignOutUrl="/" />
            <SignOutButton>
              <Button variant="ghost">Logout</Button>
            </SignOutButton>
          </SignedIn>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/10 text-white lg:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Open navigation"
        >
          {open ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#081120]/98 px-4 py-4 lg:hidden">
          <div className="flex flex-col gap-2">
            {navItems.map((item) => (
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
