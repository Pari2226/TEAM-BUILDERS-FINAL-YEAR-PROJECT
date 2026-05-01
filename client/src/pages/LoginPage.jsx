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
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70">
            Welcome back
          </p>
          <h1 className="mt-4 text-4xl font-bold text-white md:text-6xl">
            Sign in to keep building momentum.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-white/70">
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
                  colorText: "#f8fbff",
                  colorInputBackground: "rgba(255,255,255,0.05)",
                  colorInputText: "#f8fbff",
                  colorNeutral: "#dbeafe",
                },
                elements: {
                  card: "bg-transparent shadow-none border-0",
                  headerTitle: "text-white",
                  headerSubtitle: "text-white/70",
                  formButtonPrimary:
                    "bg-cyan-400 text-slate-950 hover:bg-cyan-300",
                  formFieldLabel: "text-white/75",
                  formFieldInput:
                    "border-white/10 bg-white/5 text-white placeholder:text-white/30",
                  footerActionLink: "text-cyan-300 hover:text-cyan-200",
                  socialButtonsBlockButton:
                    "border-white/10 bg-white/5 text-white hover:bg-white/10",
                  dividerLine: "bg-white/10",
                  dividerText: "text-white/50",
                },
              }}
            />
          </div>
        </GlassCard>
      </SignedOut>
    </PageShell>
  );
}
