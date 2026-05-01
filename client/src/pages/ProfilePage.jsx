import { useEffect, useState } from "react";
import { useAuth, useUser } from "@clerk/clerk-react";
import PageShell from "../components/layout/PageShell";
import GlassCard from "../components/ui/GlassCard";
import EditProfile from "../components/EditProfile";
import { useToast } from "../context/ToastContext";
import api from "../services/api";

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
    image: "",
    skills: "",
  });
  const [loading, setLoading] = useState(false);

  const buildFormFromProfile = (profile, fallback = {}) => ({
    name: profile?.name || fallback.name || "",
    role: profile?.role || fallback.role || "Full Stack",
    bio: profile?.bio || "",
    github: profile?.github || "",
    linkedin: profile?.linkedin || "",
    image: profile?.image || profile?.profileImage || fallback.image || "",
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
          image: clerkUser.imageUrl || "",
        }),
      );
    } catch {
      setCurrentUser(null);
      setForm(
        buildFormFromProfile(null, {
          name: clerkUser.fullName || clerkUser.firstName || "",
          role: "Full Stack",
          image: clerkUser.imageUrl || "",
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
      const token =
        (await getToken()) || (await getToken({ template: "default" }));
      const payload = {
        ...form,
        skills: form.skills
          .split(",")
          .map((skill) => skill.trim())
          .filter(Boolean),
      };
      console.log("Sending data:", payload);

      const { data } = await api.put("/api/users/update", payload, {
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      if (data?.success && data?.user) {
        setCurrentUser(data.user);
        setForm(
          buildFormFromProfile(data.user, {
            name: form.name,
            role: form.role,
            image: form.image,
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
      pushToast(
        error.response?.data?.message || "Unable to update profile",
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
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70">
              Profile
            </p>
            <h1 className="mt-4 text-3xl font-bold text-white">
              Your public builder profile
            </h1>
            <p className="mt-2 text-white/65">
              {clerkUser?.primaryEmailAddress?.emailAddress ||
                currentUser?.email ||
                "Clerk authenticated account"}
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4 text-center">
            <p className="text-sm text-white/60">Profile completion</p>
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
