import { Navigate } from "react-router-dom";
import { SignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import PageShell from "../components/layout/PageShell";
import GlassCard from "../components/ui/GlassCard";

export default function LoginPage() {
  return (
    <PageShell className="mx-auto grid min-h-[85vh] max-w-6xl items-center gap-10 px-4 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
      <SignedIn>
        <Navigate to="/dashboard" replace />
      </SignedIn>
      <SignedOut>
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent-text)]">
            Welcome back
          </p>
          <h1 className="mt-4 text-4xl font-bold text-[var(--heading-text)] md:text-6xl">
            Sign in to keep building momentum.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--text-muted)]">
            Access your teams, recommendations, and profile insights from one
            secure dashboard.
          </p>
        </div>

        <GlassCard className="mx-auto flex w-full max-w-xl justify-center p-4 sm:p-6">
          <div className="w-full max-w-md">
            <SignIn
              routing="path"
              path="/login"
              signUpUrl="/signup"
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
