import { useEffect, useMemo, useState } from "react";
import { FiSearch, FiFilter, FiCpu } from "react-icons/fi";
import api from "../services/api";
import PageShell from "../components/layout/PageShell";
import SectionHeading from "../components/ui/SectionHeading";
import GlassCard from "../components/ui/GlassCard";
import Button from "../components/ui/Button";
import UserCard from "../components/ui/UserCard";
import { sampleSkills } from "../data/mockData";
import { useToast } from "../context/ToastContext";

const roles = [
  "All",
  "Frontend",
  "Backend",
  "Full Stack",
  "ML",
  "UI/UX Designer",
];

export default function FindTeammatesPage() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");
  const [role, setRole] = useState("All");
  const [recommended, setRecommended] = useState([]);
  const { pushToast } = useToast();

  useEffect(() => {
    api
      .get("/api/users")
      .then(({ data }) => setUsers(data.users))
      .catch(() => setUsers([]));
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesQuery =
        !query ||
        user.skills?.some((skill) =>
          skill.toLowerCase().includes(query.toLowerCase()),
        ) ||
        user.name.toLowerCase().includes(query.toLowerCase());
      const matchesRole = role === "All" || user.role === role;
      return matchesQuery && matchesRole;
    });
  }, [users, query, role]);

  const handleRecommend = async () => {
    try {
      const { data } = await api.post("/api/recommend-team", {
        skills: query ? [query] : sampleSkills.slice(0, 3),
      });
      setRecommended(data);
      pushToast("AI recommendations generated", "success");
    } catch (error) {
      const fallback = filteredUsers.slice(0, 3).map((user, index) => ({
        name: user.name,
        skills: user.skills,
        matchScore: 90 - index * 5,
      }));
      setRecommended(fallback);
      pushToast("Used local match fallback", "error");
    }
  };

  return (
    <PageShell className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <SectionHeading
        eyebrow="Find Teammates"
        title="Search by skill, role, or AI-generated compatibility"
        description="Mix manual discovery with machine learning recommendations to build a high-signal shortlist."
      />

      <GlassCard className="mt-10">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr_auto]">
          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <FiSearch className="text-cyan-300" />
            <input
              className="w-full bg-transparent text-white outline-none placeholder:text-white/35"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search skills such as React, Node, Figma..."
            />
          </label>
          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white/70">
            <FiFilter className="text-cyan-300" />
            <select
              className="w-full bg-transparent outline-none"
              value={role}
              onChange={(event) => setRole(event.target.value)}
            >
              {roles.map((item) => (
                <option key={item} value={item} className="bg-slate-950">
                  {item}
                </option>
              ))}
            </select>
          </label>
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white/70">
            {filteredUsers.length} builders found
          </div>
          <Button onClick={handleRecommend} className="gap-2 whitespace-nowrap">
            <FiCpu /> Recommend
          </Button>
        </div>
      </GlassCard>

      {recommended.length > 0 && (
        <section className="mt-10">
          <SectionHeading
            eyebrow="Top matches"
            title="AI-suggested teammate shortlist"
          />
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {recommended.map((item) => (
              <GlassCard key={item.name}>
                <p className="text-lg font-semibold text-white">{item.name}</p>
                <p className="mt-2 text-sm text-white/65">
                  {item.skills?.join(", ")}
                </p>
                <p className="mt-4 text-3xl font-bold text-cyan-300">
                  {item.matchScore}%
                </p>
              </GlassCard>
            ))}
          </div>
        </section>
      )}

      <section className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredUsers.map((user) => (
          <UserCard
            key={user._id}
            user={user}
            onConnect={() =>
              pushToast(`Connection request sent to ${user.name}`, "success")
            }
            onBookmark={() => pushToast(`Bookmarked ${user.name}`, "success")}
          />
        ))}
      </section>
    </PageShell>
  );
}
