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
            <h2 className="text-3xl font-bold text-white">
              Create your builder profile in minutes.
            </h2>
            <p className="text-white/70">
              Start by sharing your skill set, then expand your profile with
              GitHub, LinkedIn, and project details later.
            </p>
            <div className="grid gap-3 sm:grid-cols-2">
              {sampleSkills.slice(0, 4).map((skill) => (
                <div
                  key={skill}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/75"
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
