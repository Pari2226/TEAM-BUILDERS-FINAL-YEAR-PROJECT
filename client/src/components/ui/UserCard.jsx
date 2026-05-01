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
          className="h-16 w-16 rounded-2xl border border-white/10 object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-white">{user.name}</h3>
              <p className="text-sm text-cyan-200/80">{user.role}</p>
            </div>
            <button
              onClick={onBookmark}
              className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition hover:text-cyan-300"
            >
              <FiBookmark />
            </button>
          </div>
          <p className="mt-3 text-sm leading-6 text-white/70">
            {user.bio ||
              "Ready to join a high-signal product or hackathon team."}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {user.skills?.slice(0, 5).map((skill) => (
              <span
                key={skill}
                className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/80"
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
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-cyan-300/40 hover:text-white"
          >
            <FiGithub className="mr-2 inline" /> GitHub
          </a>
        ) : null}
        {user.linkedin ? (
          <a
            href={user.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/10 px-4 py-2 text-sm text-white/70 transition hover:border-cyan-300/40 hover:text-white"
          >
            <FiLinkedin className="mr-2 inline" /> LinkedIn
          </a>
        ) : null}
      </div>
    </GlassCard>
  );
}
