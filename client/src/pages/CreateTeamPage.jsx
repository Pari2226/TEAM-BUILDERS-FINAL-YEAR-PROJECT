import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import PageShell from "../components/layout/PageShell";
import GlassCard from "../components/ui/GlassCard";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { useToast } from "../context/ToastContext";
import api from "../services/api";

export default function CreateTeamPage() {
  const [form, setForm] = useState({
    teamName: "",
    description: "",
    requiredSkills: "",
    maxMembers: 5,
    projectType: "",
    status: "Open",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { pushToast } = useToast();
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user } = useUser();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.teamName.trim() || !form.description.trim()) {
      pushToast("Team name and description are required", "error");
      return;
    }

    if (!isLoaded) {
      pushToast("Checking session, please try again", "error");
      return;
    }

    if (!isSignedIn) {
      pushToast("Please sign in to create a team", "error");
      navigate("/login");
      return;
    }

    if (!user?.id) {
      pushToast("Please sign in to create a team", "error");
      return;
    }

    setLoading(true);

    try {
      await getToken();
      const payload = {
        ...form,
        requiredSkills: form.requiredSkills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
        maxMembers: Number(form.maxMembers),
      };
      console.log("Sending data:", payload);

      const { data } = await api.post("/api/teams/create", payload, {
        headers: { "Content-Type": "application/json" },
      });

      if (data?.success) {
        pushToast("Team created successfully", "success");
        navigate("/teams", {
          state: { createdTeam: data?.data || data?.team },
        });
      } else if (data?.error) {
        pushToast(data.error, "error");
      }
    } catch (error) {
      pushToast(
        error.response?.data?.message || "Unable to create team",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell className="mx-auto grid min-h-[80vh] max-w-4xl items-center px-4 py-12 lg:px-8">
      <GlassCard>
        <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70">
          Create Team
        </p>
        <h1 className="mt-4 text-3xl font-bold text-white">
          Build an open project crew.
        </h1>
        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <Input
            label="Team Name"
            value={form.teamName}
            onChange={(event) =>
              setForm({ ...form, teamName: event.target.value })
            }
            placeholder="e.g. Launch Crew"
          />
          <label className="flex flex-col gap-2 text-sm text-white/80">
            <span className="font-medium">Description</span>
            <textarea
              className="min-h-32 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300/60"
              value={form.description}
              onChange={(event) =>
                setForm({ ...form, description: event.target.value })
              }
              placeholder="What is the team building?"
            />
          </label>
          <Input
            label="Required Skills"
            value={form.requiredSkills}
            onChange={(event) =>
              setForm({ ...form, requiredSkills: event.target.value })
            }
            placeholder="React, Node, Figma"
          />
          <Input
            label="Project Type"
            value={form.projectType}
            onChange={(event) =>
              setForm({ ...form, projectType: event.target.value })
            }
            placeholder="Hackathon, SaaS, Mobile App"
          />
          <label className="flex flex-col gap-2 text-sm text-white/80">
            <span className="font-medium">Status</span>
            <select
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300/60"
              value={form.status}
              onChange={(event) =>
                setForm({ ...form, status: event.target.value })
              }
            >
              <option value="Open" className="bg-slate-950">
                Open
              </option>
              <option value="In Progress" className="bg-slate-950">
                In Progress
              </option>
              <option value="Completed" className="bg-slate-950">
                Completed
              </option>
            </select>
          </label>
          <Input
            label="Max Members"
            type="number"
            min="2"
            max="20"
            value={form.maxMembers}
            onChange={(event) =>
              setForm({ ...form, maxMembers: event.target.value })
            }
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Creating..." : "Create Team"}
          </Button>
        </form>
      </GlassCard>
    </PageShell>
  );
}
