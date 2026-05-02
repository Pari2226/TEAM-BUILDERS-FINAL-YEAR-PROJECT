import { Navigate } from "react-router-dom";
import { SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";
import { FiUserPlus } from "react-icons/fi";
import PageShell from "../components/layout/PageShell";
import GlassCard from "../components/ui/GlassCard";
import { sampleSkills } from "../data/mockData";

export default function SignupPage() {
  return (
    <PageShell className="mx-auto grid min-h-[85vh] max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
      <SignedIn>
        <Navigate to="/dashboard" replace />
      </SignedIn>
      <SignedOut>
        <div className="order-2 lg:order-1">
          <GlassCard className="space-y-5">
            <div className="flex items-center gap-3 text-cyan-300">
              <FiUserPlus />{" "}
              <span className="text-sm font-semibold uppercase tracking-[0.3em]">
                Join Team Builders
              </span>
            </div>
            <h2 className="text-3xl font-bold text-[var(--heading-text)]">
              Create your builder profile in minutes.
            </h2>
            <p className="text-[var(--text-muted)]">
              Start by sharing your skill set, then expand your profile with
              GitHub, LinkedIn, and project details later.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {sampleSkills.slice(0, 4).map((skill) => (
                <div
                  key={skill}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 text-sm text-[var(--text-muted)]"
                >
                  {skill}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <GlassCard className="order-1 mx-auto flex w-full max-w-xl justify-center p-4 sm:p-6 lg:order-2">
          <div className="w-full max-w-md">
            <SignUp
              routing="path"
              path="/signup"
              signInUrl="/login"
              forceRedirectUrl="/dashboard"
              appearance={{
                variables: {
                  colorPrimary: "#22d3ee",
                  colorBackground: "transparent",
                  colorText: "var(--app-text)",
                  colorInputBackground: "var(--surface-soft)",
                  colorInputText: "var(--app-text)",
                  colorNeutral: "var(--text-muted)",
                },
                elements: {
                  card: "bg-transparent shadow-none border-0",
                  headerTitle: "text-[var(--heading-text)]",
                  headerSubtitle: "text-[var(--text-muted)]",
                  formButtonPrimary:
                    "bg-cyan-400 text-slate-950 hover:bg-cyan-300",
                  formFieldLabel: "text-[var(--text-muted)]",
                  formFieldInput:
                    "border-[var(--border)] bg-[var(--surface-soft)] text-[var(--app-text)] placeholder:text-[var(--text-subtle)]",
                  footerActionLink: "text-cyan-300 hover:text-cyan-200",
                  socialButtonsBlockButton:
                    "border-[var(--border)] bg-[var(--surface-soft)] text-[var(--app-text)] hover:bg-[var(--surface)]",
                  dividerLine: "bg-[var(--border)]",
                  dividerText: "text-[var(--text-subtle)]",
                },
              }}
            />
          </div>
        </GlassCard>
      </SignedOut>
    </PageShell>
  );
}
