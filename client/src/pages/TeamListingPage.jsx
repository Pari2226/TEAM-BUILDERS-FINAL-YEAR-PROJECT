import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useAuth } from "@clerk/clerk-react";
import api from "../services/api";
import PageShell from "../components/layout/PageShell";
import SectionHeading from "../components/ui/SectionHeading";
import GlassCard from "../components/ui/GlassCard";
import TeamCard from "../components/ui/TeamCard";
import Button from "../components/ui/Button";
import { useToast } from "../context/ToastContext";
import { useLocation, useNavigate } from "react-router-dom";

const statuses = ["All", "Open", "In Progress", "Completed"];

export default function TeamListingPage() {
  const [teams, setTeams] = useState([]);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const { isSignedIn } = useAuth();
  const { pushToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const createdTeam = location.state?.createdTeam;
    if (createdTeam) {
      setTeams((current) => {
        const alreadyAdded = current.some(
          (team) => team._id === createdTeam._id,
        );
        return alreadyAdded ? current : [createdTeam, ...current];
      });
    }

    api
      .get("/api/teams")
      .then(({ data }) => {
        const fetchedTeams = data.teams || [];
        setTeams((current) => {
          if (!createdTeam) {
            return fetchedTeams;
          }

          const merged = fetchedTeams.some(
            (team) => team._id === createdTeam._id,
          )
            ? fetchedTeams
            : [createdTeam, ...fetchedTeams];
          return merged;
        });
      })
      .catch(() => setTeams([]));
  }, [location.state]);

  const filteredTeams = useMemo(() => {
    return teams.filter((team) => {
      const matchesQuery =
        !query ||
        team.teamName.toLowerCase().includes(query.toLowerCase()) ||
        team.requiredSkills?.some((skill) =>
          skill.toLowerCase().includes(query.toLowerCase()),
        );
      const matchesStatus = status === "All" || team.status === status;
      return matchesQuery && matchesStatus;
    });
  }, [teams, query, status]);

  const joinTeam = async (teamId) => {
    if (!isSignedIn) {
      navigate("/login");
      return;
    }

    try {
      await api.post(`/teams/join/${teamId}`);
      pushToast("Joined team successfully", "success");
      const { data } = await api.get("/api/teams");
      setTeams(data.teams);
    } catch (error) {
      pushToast(
        error.response?.data?.message || "Unable to join team",
        "error",
      );
    }
  };

  return (
    <PageShell className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
      <SectionHeading
        eyebrow="Team Listing"
        title="Explore open teams and start contributing"
        description="Filter by stage, search by stack, and join teams that need your skills."
      />

      <GlassCard className="mt-10">
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr_auto]">
          <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
            <FiSearch className="text-cyan-300" />
            <input
              className="w-full bg-transparent text-white outline-none placeholder:text-white/35"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search teams or required skills"
            />
          </label>
          <select
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            {statuses.map((item) => (
              <option key={item} value={item} className="bg-slate-950">
                {item}
              </option>
            ))}
          </select>
          <Button variant="secondary" to="/create-team">
            Create Team
          </Button>
        </div>
      </GlassCard>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredTeams.map((team) => (
          <TeamCard
            key={team._id}
            team={team}
            onAction={() => joinTeam(team._id)}
          />
        ))}
      </div>
    </PageShell>
  );
}
