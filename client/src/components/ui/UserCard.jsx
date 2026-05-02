import {
  FiGithub,
  FiLinkedin,
  FiMessageSquare,
  FiBookmark,
} from "react-icons/fi";
import GlassCard from "./GlassCard";
import Button from "./Button";

export default function UserCard({ user, onConnect, onBookmark }) {
  return (
    <GlassCard>
      <div className="flex items-start gap-4">
        <img
          src={
            user.image ||
            user.profileImage ||
            `https://api.dicebear.com/9.x/shapes/svg?seed=${encodeURIComponent(user.name)}`
          }
          alt={user.name}
          className="h-16 w-16 rounded-2xl border border-[var(--border)] object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-[var(--app-text)]">
                {user.name}
              </h3>
              <p className="text-sm text-[var(--accent-text-soft)]">
                {user.role}
              </p>
            </div>
            <button
              onClick={onBookmark}
              className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] p-2 text-[var(--text-muted)] transition hover:text-cyan-300"
            >
              <FiBookmark />
            </button>
          </div>
          <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
            {user.bio ||
              "Ready to join a high-signal product or hackathon team."}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {user.skills?.slice(0, 5).map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-[var(--chip-bg)] px-3 py-1 text-xs text-[var(--chip-text)]"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap items-center gap-3">
        <Button onClick={onConnect} className="gap-2">
          <FiMessageSquare /> Connect
        </Button>
        {user.github ? (
          <a
            href={user.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-muted)] transition hover:border-cyan-300/40 hover:text-[var(--app-text)]"
          >
            <FiGithub className="mr-2 inline" /> GitHub
          </a>
        ) : null}
        {user.linkedin ? (
          <a
            href={user.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-muted)] transition hover:border-cyan-300/40 hover:text-[var(--app-text)]"
          >
            <FiLinkedin className="mr-2 inline" /> LinkedIn
          </a>
        ) : null}
      </div>
    </GlassCard>
  );
}
