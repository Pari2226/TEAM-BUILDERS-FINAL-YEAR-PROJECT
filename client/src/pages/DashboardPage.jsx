import { useEffect, useState } from "react";
import { FiActivity, FiBarChart2, FiUsers, FiTarget } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import api from "../api/axios";
import PageShell from "../components/layout/PageShell";
import SectionHeading from "../components/ui/SectionHeading";
import GlassCard from "../components/ui/GlassCard";
import StatCard from "../components/ui/StatCard";
import TeamCard from "../components/ui/TeamCard";

export default function DashboardPage() {
  const { user: clerkUser, isLoaded } = useUser();
  const [dashboard, setDashboard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api
      .get("/users/dashboard")
      .then(({ data }) => setDashboard(data))
      .catch(() => setDashboard(null));
  }, []);

  const profileCompletion =
    dashboard?.profileCompletion ??
    Math.min(100, 40 + (dashboard?.myTeams?.length || 0) * 8);

  return (
    <PageShell className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <section className="rounded-[32px] border border-[var(--border)] bg-[var(--surface-soft)] p-8 shadow-glow backdrop-blur-xl">
        <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent-text)]">
          Dashboard
        </p>
        <div className="mt-4 flex items-center gap-4">
          <img
            src={
              clerkUser?.imageUrl ||
              `https://api.dicebear.com/9.x/shapes/svg?seed=${encodeURIComponent(clerkUser?.fullName || clerkUser?.firstName || "Builder")}`
            }
            alt={clerkUser?.fullName || "Builder"}
            className="h-16 w-16 rounded-2xl border border-[var(--border)] object-cover"
          />
          <div>
            <h1 className="text-4xl font-bold text-[var(--heading-text)] md:text-5xl">
              Welcome back,{" "}
              {clerkUser?.firstName || clerkUser?.fullName || "Builder"}.
            </h1>
            <p className="mt-2 text-[var(--text-muted)]">
              {clerkUser?.primaryEmailAddress?.emailAddress ||
                "Signed in with Clerk"}
            </p>
          </div>
        </div>
        <p className="mt-4 max-w-3xl text-[var(--text-muted)]">
          Track your teams, inspect recommendations, and keep your profile ready
          for the next project opportunity.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <StatCard
            label="Profile completion"
            value={`${profileCompletion}%`}
            icon={FiBarChart2}
          />
          <StatCard
            label="My teams"
            value={dashboard?.myTeams?.length || 0}
            icon={FiUsers}
          />
          <StatCard
            label="Joined projects"
            value={dashboard?.joinedProjects?.length || 0}
            icon={FiTarget}
          />
          <StatCard
            label="Recent activity"
            value={dashboard?.recentActivity?.length || 0}
            icon={FiActivity}
          />
        </div>
      </section>

      <section className="mt-12 grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <SectionHeading
            eyebrow="My Teams"
            title="Your active collaboration spaces"
          />
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {(dashboard?.myTeams || []).map((team) => (
              <TeamCard
                key={team._id}
                team={team}
                actionLabel="Open"
                onAction={() => navigate("/teams")}
                compact
              />
            ))}
            {!dashboard?.myTeams?.length && (
              <GlassCard>
                No teams yet. Create or join one to start collaborating.
              </GlassCard>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <GlassCard>
            <h2 className="text-xl font-semibold text-[var(--heading-text)]">
              Recommended teammates
            </h2>
            <p className="mt-3 text-[var(--text-muted)]">
              Use the teammate finder to surface stronger matches based on your
              skills.
            </p>
            <div className="mt-5 rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface-soft)] p-6 text-sm text-[var(--text-muted)]">
              AI recommendations will appear here once the recommendation
              service is connected.
            </div>
          </GlassCard>

          <GlassCard>
            <h2 className="text-xl font-semibold text-[var(--heading-text)]">
              Recent activity
            </h2>
            <div className="mt-5 space-y-4">
              {(dashboard?.recentActivity || []).map((activity) => (
                <div
                  key={activity.title}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] p-4"
                >
                  <p className="font-semibold text-[var(--app-text)]">
                    {activity.title}
                  </p>
                  <p className="mt-1 text-sm text-[var(--text-muted)]">
                    {activity.description}
                  </p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </section>
    </PageShell>
  );
}
