import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import PageShell from "../components/layout/PageShell";
import GlassCard from "../components/ui/GlassCard";
import EditProfile from "../components/EditProfile";
import { useToast } from "../context/ToastContext";
import api, { BASE_URL } from "../api/axios";

export default function ProfilePage() {
  const { user: clerkUser, isLoaded } = useUser();
  const { getToken, isSignedIn } = useAuth();
  const { pushToast } = useToast();
  const [currentUser, setCurrentUser] = useState(null);
  const [form, setForm] = useState({
    name: "",
    role: "",
    bio: "",
    github: "",
    linkedin: "",
    otherLinks: "",
    skills: "",
  });
  const [loading, setLoading] = useState(false);

  const buildFormFromProfile = (profile, fallback = {}) => ({
    name: profile?.name || fallback.name || "",
    role: profile?.role || fallback.role || "Full Stack",
    bio: profile?.bio || "",
    github: profile?.github || "",
    linkedin: profile?.linkedin || "",
    otherLinks: Array.isArray(profile?.otherLinks)
      ? profile.otherLinks.join(", ")
      : profile?.otherLinks || fallback.otherLinks || "",
    skills: (profile?.skills || []).join(", "),
  });

  const loadProfile = async () => {
    if (!isLoaded || !clerkUser) {
      return;
    }

    try {
      const { data } = await api.get("/api/auth/me");
      const profile = data.user || {};
      setCurrentUser(profile);
      setForm(
        buildFormFromProfile(profile, {
          name: clerkUser.fullName || clerkUser.firstName || "",
          role: "Full Stack",
          otherLinks: "",
        }),
      );
    } catch {
      setCurrentUser(null);
      setForm(
        buildFormFromProfile(null, {
          name: clerkUser.fullName || clerkUser.firstName || "",
          role: "Full Stack",
          otherLinks: "",
        }),
      );
    }
  };

  useEffect(() => {
    loadProfile();
  }, [clerkUser, isLoaded]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isLoaded) {
      pushToast("Checking session, please try again", "error");
      return;
    }

    if (!isSignedIn) {
      pushToast("Please sign in to update your profile", "error");
      return;
    }

    if (!clerkUser?.id) {
      pushToast("Please sign in to update your profile", "error");
      return;
    }

    setLoading(true);
    try {
      const token = await getToken({ template: "default" });
      console.log("Token:", token);
      const payload = {
        ...form,
        skills: form.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };
      console.log("Sending data:", payload);
      console.log("[Profile] Submitting update", {
        hasToken: Boolean(token),
        payload,
      });

      console.log("Update URL:", `${BASE_URL}/api/users/update`);
      const { data } = await api.put("/api/users/update", payload, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });
      console.log("[Profile] Update response", data);

      if (data?.success && data?.user) {
        setCurrentUser(data.user);
        setForm(
          buildFormFromProfile(data.user, {
            name: form.name,
            role: form.role,
            otherLinks: form.otherLinks,
          }),
        );
        pushToast("Profile updated", "success");
      } else if (data?.error) {
        pushToast(data.error, "error");
      } else {
        await loadProfile();
        pushToast("Profile updated", "success");
      }
    } catch (error) {
      console.error("[Profile] Update error", {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });
      pushToast(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Unable to update profile",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageShell className="mx-auto max-w-5xl px-4 py-12 lg:px-8">
      <GlassCard>
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-[var(--accent-text)]">
              Profile
            </p>
            <h1 className="mt-4 text-3xl font-bold text-[var(--heading-text)]">
              Your public builder profile
            </h1>
            <p className="mt-2 text-[var(--text-muted)]">
              {clerkUser?.primaryEmailAddress?.emailAddress ||
                currentUser?.email ||
                "Clerk authenticated account"}
            </p>
          </div>
          <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface-soft)] px-5 py-4 text-center">
            <p className="text-sm text-[var(--text-muted)]">
              Profile completion
            </p>
            <p className="mt-1 text-3xl font-bold text-cyan-300">
              {Math.min(
                100,
                40 + form.skills.split(",").filter(Boolean).length * 10,
              )}
              %
            </p>
          </div>
        </div>
        <EditProfile
          form={form}
          loading={loading}
          onSubmit={handleSubmit}
          onChange={(field, value) =>
            setForm((prev) => ({ ...prev, [field]: value }))
          }
        />
      </GlassCard>
    </PageShell>
  );
}
