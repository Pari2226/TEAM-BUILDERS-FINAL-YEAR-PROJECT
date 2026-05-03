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
      <label className="flex flex-col gap-2 text-sm text-[var(--text-muted)]">
        <span className="font-medium">Role</span>
        <select
          className="rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 text-[var(--app-text)] outline-none focus:border-cyan-300/60 focus:bg-[var(--surface)]"
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
            <option
              key={role}
              value={role}
              className="bg-[var(--app-bg)] text-[var(--app-text)]"
            >
              {role}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-2 text-sm text-[var(--text-muted)] md:col-span-2">
        <span className="font-medium">Bio</span>
        <textarea
          className="min-h-32 rounded-2xl border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 text-[var(--app-text)] outline-none focus:border-cyan-300/60 focus:bg-[var(--surface)]"
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
        label="Other Links"
        value={form.otherLinks}
        onChange={(event) => onChange("otherLinks", event.target.value)}
        placeholder="Add portfolio, LeetCode, or other links"
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
