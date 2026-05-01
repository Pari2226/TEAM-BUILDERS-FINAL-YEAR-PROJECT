import { FiUsers, FiArrowRight } from "react-icons/fi";
import GlassCard from "./GlassCard";
import Button from "./Button";

export default function TeamCard({
  team,
  actionLabel = "Join Team",
  onAction,
  compact = false,
}) {
  return (
    <GlassCard className="flex h-full flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-cyan-300/70">
              {team.status || "Open"}
            </p>
            <h3 className="mt-2 text-xl font-semibold text-white">
              {team.teamName}
            </h3>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-cyan-300">
            <FiUsers />
          </div>
        </div>
        <p
          className={`mt-4 text-sm leading-6 text-white/70 ${compact ? "line-clamp-3" : ""}`}
        >
          {team.description}
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {team.requiredSkills?.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-6 flex items-center justify-between gap-4 text-sm text-white/60">
        <span>
          {team.members?.length || 0}/{team.maxMembers || 5} members
        </span>
        <Button variant="secondary" onClick={onAction} className="gap-2">
          {actionLabel}
          <FiArrowRight />
        </Button>
      </div>
    </GlassCard>
  );
}
