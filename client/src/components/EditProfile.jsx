import Input from "./ui/Input";
import Button from "./ui/Button";

export default function EditProfile({ form, onChange, onSubmit, loading }) {
  return (
    <form className="mt-8 grid gap-5 md:grid-cols-2" onSubmit={onSubmit}>
      <Input
        label="Name"
        value={form.name}
        onChange={(event) => onChange("name", event.target.value)}
      />
      <label className="flex flex-col gap-2 text-sm text-white/80">
        <span className="font-medium">Role</span>
        <select
          className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300/60"
          value={form.role}
          onChange={(event) => onChange("role", event.target.value)}
        >
          {[
            "Frontend",
            "Backend",
            "Full Stack",
            "ML",
            "UI/UX Designer",
            "Founder",
            "Other",
          ].map((role) => (
            <option key={role} value={role} className="bg-slate-950">
              {role}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-2 text-sm text-white/80 md:col-span-2">
        <span className="font-medium">Bio</span>
        <textarea
          className="min-h-32 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300/60"
          value={form.bio}
          onChange={(event) => onChange("bio", event.target.value)}
        />
      </label>
      <Input
        label="GitHub"
        value={form.github}
        onChange={(event) => onChange("github", event.target.value)}
        placeholder="https://github.com/yourname"
      />
      <Input
        label="LinkedIn"
        value={form.linkedin}
        onChange={(event) => onChange("linkedin", event.target.value)}
        placeholder="https://linkedin.com/in/yourname"
      />
      <Input
        label="Profile Image"
        value={form.image}
        onChange={(event) => onChange("image", event.target.value)}
        placeholder="https://..."
      />
      <Input
        label="Skills"
        className="md:col-span-2"
        value={form.skills}
        onChange={(event) => onChange("skills", event.target.value)}
        placeholder="React, Node, MongoDB"
      />
      <div className="md:col-span-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Profile"}
        </Button>
      </div>
    </form>
  );
}
